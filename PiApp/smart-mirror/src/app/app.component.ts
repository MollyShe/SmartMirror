import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherViewComponent } from './weather-view/weather-view.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WeatherViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'smart-mirror';
}
