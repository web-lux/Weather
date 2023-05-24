import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from 'src/app/services/weather-api.service';
@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

constructor(
  private weatherApiService: WeatherApiService
) {}

  ngOnInit(): void {
    this.weatherApiService.getWeather().subscribe(data => console.log(data))
  }
}
