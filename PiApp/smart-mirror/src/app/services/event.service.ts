// src/app/services/event.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, filter, map } from 'rxjs';

export interface CalendarEvent {
  id: number;
  title: string;
  start: Date; // ISO string
  end: Date; // ISO string
  description?: string;
}

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor() {}

  async getEvents(): Promise<Observable<CalendarEvent[]>> {
    const apiURL = 'http://172.29.144.241:5400/calendar';
    let json;
    const data = await fetch(apiURL);
    const dates = await data.json();

    // Convert start and end strings to Date objects
    const convertedEvents: CalendarEvent[] = dates.map(
      (event: CalendarEvent) => ({
        ...event,
        start: new Date(event.start), // Convert string to Date
        end: new Date(event.end), // Convert string to Date
      })
    );

    return of(convertedEvents); // Return as Observable
  }
}
