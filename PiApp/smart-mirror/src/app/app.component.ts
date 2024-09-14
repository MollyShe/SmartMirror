import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { CarouselComponent } from './carousel/carousel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CarouselComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'smart-mirror';
}
