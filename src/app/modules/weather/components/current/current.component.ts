import { Component, OnInit } from "@angular/core";
import Weather from "src/app/interface/Weather";
import { GeolocationApiService } from "src/app/services/geolocation-api.service";
import { WeatherApiService } from "src/app/services/weather-api.service";

@Component({
	selector: "app-current",
	templateUrl: "./current.component.html",
})
export class CurrentComponent implements OnInit {
	constructor(
		private geolocationService: GeolocationApiService,
		private weatherService: WeatherApiService
	) {}

	currentWeather!: Weather;
	currentMeteo!: string;
	currentCity!: string;

	async ngOnInit() {
		this.weatherService.userWeather$.subscribe(async (res) => {
			const observable$ = await res;
			observable$.subscribe((res: Weather) => {
				this.currentWeather = res;
				this.currentMeteo = this.weatherService.weatherCodeIntoString(
					this.currentWeather.current_weather.weathercode
				);
			});
		});
		this.geolocationService.citySubject$.subscribe(
			async (res: Promise<string>) => {
				this.currentCity = await res;
			}
		);
	}
}
