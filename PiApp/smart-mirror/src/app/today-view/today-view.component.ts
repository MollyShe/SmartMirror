import { Component, OnInit, Inject } from '@angular/core';
import { EventService } from '../services/event.service';
import { format, parseISO } from 'date-fns';
import { CommonModule } from '@angular/common';

interface Event {
  id: number;
  title: string;
  description?: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
}

@Component({
  selector: 'app-today-view',
  templateUrl: './today-view.component.html',
  styleUrls: ['./today-view.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class TodayViewComponent implements OnInit {
  events: Event[] = [];
  currentDate: Date = new Date();
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(@Inject(EventService) private eventService: EventService) {}

  ngOnInit(): void {
    this.loadTodayEvents();
  }

  loadTodayEvents(): void {
    this.isLoading = true;
    this.errorMessage = '';
    const dateStr = format(this.currentDate, 'yyyy-MM-dd');
    this.eventService.getEventsByDate(dateStr).subscribe(
      (data: Event[]) => {
        this.isLoading = false;
        // Sort events by start time
        this.events = data.sort((a: Event, b: Event) => {
          return (
            parseISO(a.startTime).getTime() - parseISO(b.startTime).getTime()
          );
        });
      },
      (error: any) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load events. Please try again later.';
        console.error('Error fetching events:', error);
      }
    );
  }

  // Helper to format time
  formatTime(time: string): string {
    return format(parseISO(time), 'hh:mm a');
  }
}
