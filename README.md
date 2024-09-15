## Inspiration
We were inspired by the feeling of doomscrolling every morning, that loss of productivity that slows you down every day. But now, with our team's latest invention: REFLƎCT ⱯI, you'll never have to worry about that again! Start your day with the most important information to get you started off right.

## What it does
Our **smart mirror** helps you **self reflect** every morning by greeting you with your tasks for the day from your **Google or Outlook calendar**. By showing users their schedule first thing in the morning, we help remind users of important tasks and responsibilities. Know what your tasks are for the day? Simply swipe your hand in front of the mirror...and boom! Magic! The AI powered mirror will show you the weather and your agenda for the week.

## How we built it
We used **OpenCV** with the **Google media pipeline** to detect hand gestures. We then correlated the gestures with the distance your hand traveled and its velocity to determine swiping while minimizing false positives. The User Interface is written in **angular.js** and uses a **WebSocket** to link to the OpenCV application to move through the pages. We use a **Flask API** to get personalized weather/calendar information. 

## Challenges we ran into
We had some difficulties moving from hand detection to motion detection. In order to overcome this challenge, we used **advanced mathematics** to store the previous hand data to infer the gesture at a given time. Additionally, it was difficult to get the model running on the compute **constrained** **Raspberry PI**, so we run inference on a laptop and communicate all gesture information to the PI over the **WebSocket**.

When linking to our **Flask API** we found that dates and times in calendars frequently add additional information such as the timezone and Null parameters to the time of an event that isn't needed to parse the time and date. To solve this, we had to extract only the text within the time strings that fit a proper date format.

## Accomplishments that we're proud of
   Custom trained machine learning model for gesture recognition. 
    Because we did frequent integration tests between components, our project came together smoothly and with relative ease. We spent minimal time on **integration** and were then able to enhance the **UI/UX** of our mirror.
The **UI/UX** of our product is very natural. People who interacted with our project very quickly understood how the gestures worked and how to scroll between our various frames.

## What we learned
Over the course of the last 36 hours, we learned how to take popsicle sticks, some hot glue, a **Raspberry Pi**, and a dream, and make a functional product! With many team members new to **angular.js**, we had to learn on the fly to debug our **User Interface** and link it with our **Flask API** and the **Machine Learning** model handling the gesture recognition. We learned how to use handmark landmarks from media pipe to detect hand gestures. 

## What's next for REFLƎCT ⱯI
We want to integrate presence detection to wake up the mirror when you walk up to it and minimize power consumption. If we were to continue with this project, we would switch from a **Raspberry Pi** to something capable of running the **Machine Learning** model locally, such as a **Jetson Nano**. 
