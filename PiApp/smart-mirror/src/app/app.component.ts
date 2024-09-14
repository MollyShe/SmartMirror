import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodayViewComponent } from './today-view/today-view.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodayViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'smart-mirror';
}
