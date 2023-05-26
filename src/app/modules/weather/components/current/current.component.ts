import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
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
	currentMeteo!: string;
	currentCity!: any;

	weatherCodeIntoString(weatherCode: number) {
		switch (weatherCode) {
			case 0:
				return "Ciel dégagé";
			case 1 || 2 || 3:
				return "Partiellement nuageux";
			case 45 | 48:
				return "Brouillard";
			case 51 | 53 | 55:
				return "Bruine";
			case 56 | 57:
				return "Bruine glacial";
			case 61 | 63 | 65:
				return "Pluie";
			case 66 | 67:
				return "Pluie glaciale";
			case 71 | 73 | 75:
				return "Neige";
			case 77:
				return "Grêlons";
			case 80 | 81 | 82:
				return "Averse";
			case 85 | 86:
				return "Chute de neige";
			case 95:
				return "Orage";
			case 96 | 99:
				return "Orage avec grêle";

			default:
				return "Météo inconnue";
		}
	}

	async ngOnInit() {
		this.weatherService.userWeather$.subscribe(async (res: any) => {
			const observable$ = await res;
			observable$.subscribe((res: any) => {
				this.currentWeather = res;
				this.currentMeteo = this.weatherCodeIntoString(
					this.currentWeather.current_weather.weathercode
				);
			});
		});
		this.geolocationService.currentCity.subscribe(async (res: any) => {
			this.currentCity = await res;
		});
	}
}
