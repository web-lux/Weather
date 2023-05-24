import { Component, OnInit } from "@angular/core";
import { WeatherApiService } from "src/app/services/weather-api.service";
@Component({
	selector: "app-forecast",
	templateUrl: "./forecast.component.html",
})
export class ForecastComponent implements OnInit {
	constructor(private weatherService: WeatherApiService) {}

	ngOnInit(): void {
		// this.weatherApiService.getWeather().subscribe(data => console.log(data))
	}
}
