import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'smart-mirror';
}
