import cv2
import mediapipe as mp
import asyncio
import websockets
import json
from collections import deque
from time import time

# Initialize MediaPipe Hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
    static_image_mode=False, max_num_hands=1, min_detection_confidence=0.5
)

# Variables for swipe detection
position_history = deque(maxlen=5)  # Store last x positions with timestamps
swipe_threshold = 0.15  # Percentage of screen width
min_velocity = 1.3  # Minimum velocity for a swipe (screen widths per second)
last_swipe_time = 0
cooldown = 1  # Cooldown period in seconds

# WebSocket server
connected = set()


async def register(websocket):
    connected.add(websocket)
    try:
        await websocket.wait_closed()
    finally:
        connected.remove(websocket)


async def broadcast(message):
    for websocket in connected:
        await websocket.send(json.dumps(message))


async def websocket_server():
    server = await websockets.serve(register, "localhost", 8765)
    await server.wait_closed()


def detect_swipe(positions, frame_width, current_time):
    global last_swipe_time
    if len(positions) < 2:
        return None

    start_x, start_time = positions[0]
    end_x, end_time = positions[-1]
    distance = end_x - start_x
    time_diff = end_time - start_time

    if time_diff == 0:
        return None

    velocity = abs(distance / frame_width) / time_diff  # In screen widths per second

    if (
        abs(distance) > frame_width * swipe_threshold
        and velocity > min_velocity
        and current_time - last_swipe_time > cooldown
    ):
        last_swipe_time = current_time
        print(f"Distance: {distance/frame_width}, Velocity: {velocity}")
        return "Right" if distance < 0 else "Left"
    return None


async def process_frame():
    cap = cv2.VideoCapture(0)
    frame_width = cap.get(cv2.CAP_PROP_FRAME_WIDTH)

    while True:
        ret, frame = cap.read()
        if not ret:
            continue

        current_time = time()
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(rgb_frame)

        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                index_finger_tip = hand_landmarks.landmark[
                    mp_hands.HandLandmark.INDEX_FINGER_TIP
                ]
                x = index_finger_tip.x * frame_width
                position_history.append((x, current_time))

                swipe_direction = detect_swipe(
                    position_history, frame_width, current_time
                )
                if swipe_direction:
                    print(f"Swipe {swipe_direction} detected!")
                    await broadcast({"swipe": swipe_direction})
                    position_history.clear()  # Clear history after a swipe

        else:
            position_history.clear()  # Clear history if no hand detected

        await asyncio.sleep(0.01)  # Small delay to prevent blocking

    cap.release()


async def main():
    await asyncio.gather(websocket_server(), process_frame())


if __name__ == "__main__":
    asyncio.run(main())
