import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format, isSameMonth, isSameDay } from 'date-fns';
import { EventService } from '../services/event.service';

interface calendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;   
  description?: string;
}


@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit {
  daysOfWeek: string[] = [];
  hours: string[] = [];
  events: calendarEvent[] = [];

  // Define the start and end hours for the calendar view
  startHour: number = 6; // 6 AM
  endHour: number = 22; // 10 PM

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.initializeDays();
    this.initializeHours();
    this.fetchEvents();
  }

  initializeDays(): void {
    this.daysOfWeek = []; // Reset the array
    const current = new Date();
    const day = current.getDay(); // 0 (Sun) to 6 (Sat)
    // Assuming week starts on Monday
    for (let i = 1; i <= 7; i++) {
      const d = new Date(current);
      d.setDate(current.getDate() - ((day + 6) % 7) + i - 1);
      this.daysOfWeek.push(`${d.toLocaleDateString(undefined, { weekday: 'short' })} ${d.getDate()}`);
    }
  }

  initializeHours(): void {
    this.hours = []; // Reset the array
    for (let i = this.startHour; i <= this.endHour; i++) {
      const suffix = i > 12 ? 'PM' : 'AM';
      const hour = i % 12 || 12;
      this.hours.push(`${hour}:00 ${suffix}`);
    }
  }

  async fetchEvents(): Promise<void> {
    (await this.eventService.getEvents()).subscribe({
      next: (events: calendarEvent[]) => {
        this.events = events.map(event => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
      },
      error: (err: any) => {
        console.error('Error fetching events:', err);
      },
      complete: () => {
        console.log('Events fetched successfully');
      }
    });    
  }
  

  getEventsForDay(dayIndex: number): calendarEvent[] {
    const selectedDay = new Date();
    selectedDay.setDate(selectedDay.getDate() - ((new Date().getDay() + 6) % 7) + dayIndex);
    return this.events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === selectedDay.toDateString();
    });
  }

  getEventPosition(event: calendarEvent): { top: string; height: string } {
    const start = new Date(event.start);
    const end = new Date(event.end);
    const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60); // in hours
    const top = ((start.getHours() + start.getMinutes() / 60) - this.startHour) * 60; // in pixels
    const height = duration * 60; // assuming 1 hour = 60px
    return {
      top: `${top}px`,
      height: `${height}px`
    };
  }
}
