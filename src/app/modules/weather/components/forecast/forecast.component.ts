import { Component, OnInit } from "@angular/core";
import Weather from "src/app/interface/Weather";
import { WeatherApiService } from "src/app/services/weather-api.service";

@Component({
	selector: "app-forecast",
	templateUrl: "./forecast.component.html",
})
export class ForecastComponent implements OnInit {
	constructor(private weatherService: WeatherApiService) {}

	dailyWeather!: any;

	createArray(object: any) {
		/* Crée un array de 7 objets pour les 7 jours de prévision 
		météo avec les infos remises au bon endroit */
		let arr = [];
		for (let i = 0; i < 7; i++) {
			arr.push({
				temperature_2m_max: object.temperature_2m_max[i],
				temperature_2m_min: object.temperature_2m_min[i],
				time: new Date(object.time[i]).toLocaleDateString("fr"),
				weathercode: object.weathercode[i],
			});
		}
		return arr;
	}

	getWeatherString(weatherCode: number) {
		return this.weatherService.weatherCodeIntoString(weatherCode);
	}

	getImage(weatherCode: number) {
		return this.weatherService.getImagePath(weatherCode);
	}

	ngOnInit(): void {
		this.weatherService.userWeather$.subscribe(async (res) => {
			const observable$ = await res;
			observable$.subscribe((res: Weather) => {
				this.dailyWeather = this.createArray(res.daily);
			});
		});
	}
}
