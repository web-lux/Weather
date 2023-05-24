import { Component, OnInit } from "@angular/core";
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

	currentWeather!: any;

	async ngOnInit() {
		this.weatherService.userWeather$.subscribe(async (res: any) => {
			const observable$ = await res;
			observable$.subscribe((res: any) => {
				this.currentWeather = res;
			});
		});
	}
}
