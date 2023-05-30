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

	getImagePath(weatherCode: number) {
		if (weatherCode === 0) {
			return "../../../../../assets/sunny.png";
		} else if (weatherCode === 1 || weatherCode === 2 || weatherCode === 3) {
			return "../../../../../assets/partiellement-ensoleille.png";
		} else if (weatherCode === 45 || weatherCode === 48) {
			return "../../../../../assets/sunny.png"; // TODO: brouillard
		} else if (weatherCode === 51 || weatherCode === 53 || weatherCode === 55) {
			return "../../../../../assets/drizzle.png";
		} else if (weatherCode === 56 || weatherCode === 57) {
			return "../../../../../assets/freezing-rain.png";
		} else if (weatherCode === 61 || weatherCode === 63 || weatherCode === 65) {
			return "../../../../../assets/drizzle.png";
		} else if (weatherCode === 66 || weatherCode === 67) {
			return "../../../../../assets/freezing-rain.png";
		} else if (weatherCode === 71 || weatherCode === 73 || weatherCode === 75) {
			return "../../../../../assets/snow.png";
		} else if (weatherCode === 77) {
			return "../../../../../assets/snow-showers.png";
		} else if (weatherCode === 80 || weatherCode === 81 || weatherCode === 82) {
			return "../../../../../assets/drizzle.png";
		} else if (weatherCode === 85 || weatherCode === 86) {
			return "../../../../../assets/snow-showers.png";
		} else if (weatherCode === 95) {
			return "../../../../../assets/thunderstorm.png";
		} else if (weatherCode === 96 || weatherCode === 99) {
			return "../../../../../assets/thunderstorm-heavy.png";
		} else {
			return "../../../../../assets/sunny.png";
		}
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
