import {
  Component,
  HostListener,
  ElementRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

// Import your three components here
import { TodayViewComponent } from '../today-view/today-view.component';
import { WeatherViewComponent } from '../weather-view/weather-view.component';
import { CalendarViewComponent } from '../calendar-view/calendar-view.component';
import { SwipeDetectionService } from '../services/swipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    CommonModule,
    TodayViewComponent,
    WeatherViewComponent,
    CalendarViewComponent,
  ],
  template: `
    <div
      class="carousel-container"
      (touchstart)="onTouchStart($event)"
      (touchmove)="onTouchMove($event)"
      (touchend)="onTouchEnd()"
      (mousedown)="onMouseDown($event)"
      (mousemove)="onMouseMove($event)"
      (mouseup)="onMouseUp()"
      (mouseleave)="onMouseUp()"
    >
      <div
        class="carousel-slide"
        [style.transform]="'translateX(' + translateX + 'px)'"
        [@slideAnimation]="{
          value: currentIndex,
          params: { offset: 100 * (currentIndex - prevIndex) }
        }"
      >
        <app-today-view></app-today-view>
        <app-weather-view></app-weather-view>
        <app-calendar-view></app-calendar-view>
      </div>
      <div class="carousel-indicators">
        <span
          *ngFor="let _ of [0, 1, 2]; let i = index"
          [class.active]="i === currentIndex"
          (click)="goToSlide(i)"
        >
        </span>
      </div>
    </div>
  `,
  styles: [
    `
      .carousel-container {
        width: 100%;
        overflow: hidden;
        position: relative;
        touch-action: pan-y;
      }
      .carousel-slide {
        display: flex;
        transition: transform 0.3s ease-out;
      }
      .carousel-slide > * {
        flex: 0 0 100%;
        width: 100%;
      }
      .carousel-indicators {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 10px;
      }
      .carousel-indicators span {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #ccc;
        cursor: pointer;
      }
      .carousel-indicators span.active {
        background-color: #333;
      }
    `,
  ],
  animations: [
    trigger('slideAnimation', [
      transition('* => *', [
        style({ transform: 'translateX({{offset}}%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
    ]),
  ],
})
export class CarouselComponent implements OnInit, OnDestroy {
  currentIndex = 0;
  prevIndex = 0;
  translateX = 0;
  private startX: number | null = null;
  private startY: number | null = null;
  private isDragging = false;
  private containerWidth: number;
  private swipeSubscription: Subscription | undefined;

  constructor(
    private el: ElementRef,
    private swipeDetectionService: SwipeDetectionService
  ) {
    this.containerWidth = 0;
  }

  ngAfterViewInit() {
    this.containerWidth = this.el.nativeElement.querySelector(
      '.carousel-container'
    ).offsetWidth;
  }

  @HostListener('window:resize')
  onResize() {
    this.containerWidth = this.el.nativeElement.querySelector(
      '.carousel-container'
    ).offsetWidth;
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.prevSlide();
    } else if (event.key === 'ArrowRight') {
      this.nextSlide();
    }
  }

  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
  }

  onTouchMove(event: TouchEvent) {
    if (this.startX === null || this.startY === null) return;

    const currentX = event.touches[0].clientX;
    const currentY = event.touches[0].clientY;
    const diffX = currentX - this.startX;
    const diffY = currentY - this.startY;

    // Check if the user is scrolling vertically
    if (Math.abs(diffY) > Math.abs(diffX)) return;

    event.preventDefault();
    this.translateX = diffX - this.currentIndex * this.containerWidth;
  }

  onTouchEnd() {
    if (this.startX === null) return;

    const endX = this.translateX + this.currentIndex * this.containerWidth;
    const diff = endX - this.startX;

    if (Math.abs(diff) > this.containerWidth / 3) {
      if (diff > 0) {
        this.prevSlide();
      } else {
        this.nextSlide();
      }
    } else {
      this.goToSlide(this.currentIndex);
    }

    this.startX = null;
    this.startY = null;
  }

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.startX = event.clientX;
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDragging || this.startX === null) return;

    const currentX = event.clientX;
    const diffX = currentX - this.startX;
    this.translateX = diffX - this.currentIndex * this.containerWidth;
  }

  onMouseUp() {
    if (!this.isDragging || this.startX === null) return;

    const endX = this.translateX + this.currentIndex * this.containerWidth;
    const diff = endX - this.startX;

    if (Math.abs(diff) > this.containerWidth / 3) {
      if (diff > 0) {
        this.prevSlide();
      } else {
        this.nextSlide();
      }
    } else {
      this.goToSlide(this.currentIndex);
    }

    this.isDragging = false;
    this.startX = null;
  }

  nextSlide() {
    this.prevIndex = this.currentIndex;
    this.currentIndex = (this.currentIndex + 1) % 3;
    this.updateTranslateX();
  }

  prevSlide() {
    this.prevIndex = this.currentIndex;
    this.currentIndex = (this.currentIndex - 1 + 3) % 3;
    this.updateTranslateX();
  }

  goToSlide(index: number) {
    this.prevIndex = this.currentIndex;
    this.currentIndex = index;
    this.updateTranslateX();
  }

  private updateTranslateX() {
    this.translateX = -this.currentIndex * this.containerWidth;
  }

  ngOnDestroy() {
    if (this.swipeSubscription) {
      this.swipeSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.swipeSubscription = this.swipeDetectionService.swipeEvents.subscribe(
      (direction: string) => {
        if (direction === 'Left') {
          this.nextSlide();
        } else if (direction === 'Right') {
          this.prevSlide();
        }
      }
    );
  }
}
