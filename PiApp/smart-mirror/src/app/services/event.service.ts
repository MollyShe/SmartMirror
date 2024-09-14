// src/app/services/event.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

interface Event {
  id: number;
  title: string;
  description?: string;
  startTime: string; // ISO string
  endTime: string;   // ISO string
}

@Injectable({
  providedIn: 'root',
})
export class EventService {
  // Mock API data
  private mockEvents: Event[] = [
    {
      id: 1,
      title: 'Team Meeting',
      startTime: '2024-09-13T12:34:00Z',
      endTime: '2024-09-13T13:34:00Z',
    },
    {
      id: 2,
      title: 'Client Call',
      startTime: '2024-09-13T15:00:00Z',
      endTime: '2024-09-13T16:00:00Z',
    },
    {
      id: 3,
      title: 'Lunch',
      startTime: '2024-09-12T12:00:00Z',
      endTime: '2024-09-12T13:00:00Z',
    },
    {
      id: 4,
      title: 'Coffee Break',
      startTime: '2024-09-10T10:30:00Z',
      endTime: '2024-09-10T10:45:00Z',
    },
  ];

  constructor() { }

  /**
   * Fetch all events (for testing or other components)
   * @returns Observable of Event array
   */
  getEvents(): Observable<Event[]> {
    return of(this.mockEvents); // Return as Observable
  }

  /**
   * Fetch events for a specific date.
   * @param date - Date in 'YYYY-MM-DD' format
   * @returns Observable of Event array
   */
  getEventsByDate(date: string): Observable<Event[]> {
    const filteredEvents = this.mockEvents.filter(event => {
      const eventDate = new Date(event.startTime).toISOString().split('T')[0];
      return eventDate === date;
    });
    return of(filteredEvents);
  }
}