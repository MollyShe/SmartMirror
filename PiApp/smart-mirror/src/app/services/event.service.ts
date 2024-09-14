// src/app/services/event.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

interface CalendarEvent {
  id: number;
  title: string;
  start: Date; // ISO string
  end: Date;   // ISO string
  description?: string;
}

@Injectable({
  providedIn: 'root',
})
export class EventService {
  getEvents(): Observable<CalendarEvent[]> {
    // Mock API data (strings)
    const mockEvents = [
      {
        id: 1,
        title: 'Team Meeting',
        start: '2024-09-13T12:34:00Z',  // ISO string
        end: '2024-09-13T13:34:00Z',    // ISO string
      },
      {
        id: 2,
        title: 'Client Call',
        start: '2024-09-13T15:00:00Z',  // ISO string
        end: '2024-09-13T16:00:00Z',    // ISO string
      },
      {
        id: 3,
        title: 'Lunch',
        start: '2024-09-12T12:00:00Z',  // ISO string
        end: '2024-09-12T13:00:00Z',    // ISO string
      },
      {
        id: 4,
        title: 'Coffee Break',
        start: '2024-09-10T10:30:00Z',  // ISO string
        end: '2024-09-10T10:45:00Z',    // ISO string
      },
    ];

    // Convert start and end strings to Date objects
    const convertedEvents: CalendarEvent[] = mockEvents.map(event => ({
      ...event,
      start: new Date(event.start),  // Convert string to Date
      end: new Date(event.end),      // Convert string to Date
    }));

    return of(convertedEvents); // Return as Observable
  }
}