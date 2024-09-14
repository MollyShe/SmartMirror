import { Component, OnInit, Inject } from '@angular/core';
import { EventService } from '../services/event.service';
import { format, parseISO } from 'date-fns';
import { CommonModule } from '@angular/common';
import { CalendarEvent } from '../services/event.service';

@Component({
  selector: 'app-today-view',
  templateUrl: './today-view.component.html',
  styleUrls: ['./today-view.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class TodayViewComponent implements OnInit {
  events: CalendarEvent[] = [];
  currentDate: Date = new Date();
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(@Inject(EventService) private eventService: EventService) {}

  ngOnInit(): void {
    this.loadTodayEvents();
  }

  async loadTodayEvents(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';
    (await this.eventService.getEvents()).subscribe(
      (data: CalendarEvent[]) => {
        this.isLoading = false;
        data = data.filter((event: CalendarEvent) => {
          return (
            event.start.getDate() === this.currentDate.getDate() &&
            event.start.getMonth() === this.currentDate.getMonth() &&
            event.start.getFullYear() === this.currentDate.getFullYear()
          );
        });
        // Sort events by start time
        this.events = data.sort((a: CalendarEvent, b: CalendarEvent) => {
          return a.start.getTime() - b.start.getTime();
        });
        console.log(this.events);
      },
      (error: any) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load events. Please try again later.';
        console.error('Error fetching events:', error);
        console.error(this.currentDate);
      }
    );
  }

  // Helper to format time
  formatTime(time: string): string {
    try {
      return format(parseISO(time), 'hh:mm a');
    } catch (e) {
      console.error('Error parsing date:', time, e);
      return 'Invalid date';
    }
  }
}
