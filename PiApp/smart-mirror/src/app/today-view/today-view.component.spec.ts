import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayViewComponent } from './today-view.component';

describe('TodayViewComponent', () => {
  let component: TodayViewComponent;
  let fixture: ComponentFixture<TodayViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodayViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
