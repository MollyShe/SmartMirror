import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-weather-view',
  standalone: true,
  imports: [CommonModule, MatCardModule, BaseChartDirective],
  templateUrl: './weather-view.component.html',
  styleUrl: './weather-view.component.css',
})
export class WeatherViewComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  location: string = 'Blacksburg, VA';
  weatherIcon: string = 'sunny';
  temperature: number = 72;
  precipitationChance: number = 20;
  forecast: string = 'Sunny with a high of 75°F';

  temperatureData = [
    { time: '6AM', temp: 65 },
    { time: '9AM', temp: 68 },
    { time: '12PM', temp: 72 },
    { time: '3PM', temp: 75 },
    { time: '6PM', temp: 73 },
    { time: '9PM', temp: 70 },
  ];

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.temperatureData.map((data) => data.time),
    datasets: [
      {
        data: this.temperatureData.map((data) => data.temp),
        label: 'Temperature',
        fill: false,
        tension: 0.5,
        borderColor: 'rgba(255,165,0,0.8)',
        backgroundColor: 'rgba(255,165,0,0.3)',
      },
    ],
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Temperature (°F)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
    },
  };

  constructor() {}

  ngOnInit(): void {
    // Here you would typically call a service to fetch real weather data
  }
}
