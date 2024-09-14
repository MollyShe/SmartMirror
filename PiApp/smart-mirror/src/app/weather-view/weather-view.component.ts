import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

Chart.register(...registerables);

interface WeatherData {
  startTime: string;
  temperature: number;
  endTime: string;
  icon: string;
  probabilityOfPrecipitation: {
    unitCode: string;
    value: number;
  };
  shortForecast: string;
}

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
  weatherIcon: string =
    'https://api.weather.gov/icons/land/night/bkn?size=small';
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
        borderColor: '#4285f4',
        backgroundColor: 'white',
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
          color: 'white',
        },
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255,255,255,0.1)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time',
          color: 'white',
        },
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255,255,255,0.1)',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
    },
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Here you would typically call a service to fetch real weather data
    this.http
      .get<[WeatherData]>('http://localhost:5000/temperature')
      .subscribe({
        next: (data) => {
          var newTempData: any[] = [];
          data.slice(0, 12).forEach((i) => {
            let time: Date = new Date(i.startTime);
            newTempData.push({
              time: time.toLocaleTimeString(),
              temp: i.temperature,
            });
          });
          console.log(newTempData);
          this.temperatureData = newTempData;
          this.temperature = newTempData[0].temp;
          this.precipitationChance = data[0].probabilityOfPrecipitation.value;
          this.forecast = data[0].shortForecast;
          this.weatherIcon = data[0].icon;
          
          this.lineChartData = {
            labels: this.temperatureData.map((data) => data.time),
            datasets: [
              {
                data: this.temperatureData.map((data) => data.temp),
                label: 'Temperature',
                fill: false,
                tension: 0.5,
                borderColor: '#4285f4',
                backgroundColor: 'rgba(66,133,244,0.1)',
              },
            ],
          };
        },
        error: (error) => {
          console.error('Error fetching weather data:', error);
          // Handle error (e.g., show error message to user)
        },
      });
  }
}
