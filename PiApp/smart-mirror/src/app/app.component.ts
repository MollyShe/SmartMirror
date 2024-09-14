import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodayViewComponent } from './today-view/today-view.component';
import { WeatherViewComponent } from './weather-view/weather-view.component';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodayViewComponent, WeatherViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'smart-mirror';
}
