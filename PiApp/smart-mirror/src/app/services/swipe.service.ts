import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SwipeDetectionService {
  private socket: WebSocket;
  public swipeEvents = new Subject<string>();

  constructor() {
    this.socket = new WebSocket('ws://10.5.16.53:8765');

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.swipe) {
        this.swipeEvents.next(data.swipe);
      }
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }
}
