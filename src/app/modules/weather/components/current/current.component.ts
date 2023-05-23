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

	userWeather!: any;

	async ngOnInit() {
		const observable = await this.weatherService.getWeather(
			this.geolocationService.getUserGeoLocation()
		);
		observable.subscribe((res) => {
			this.userWeather = res;
		});

		// this.weatherService.getWeather();
		// console.log(this.weatherService.userWeather());
		// const tamer = await this.geolocationService.getLocation();
		// tamer.subscribe((res: any) => {
		// 	this.userLocation = res;
		// 	console.log(res);
		// });
	}
}
