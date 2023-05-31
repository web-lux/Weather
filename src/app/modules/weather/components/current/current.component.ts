import { Component, OnInit } from "@angular/core";
import Weather from "src/app/interface/Weather";
import { LocationApiService } from "src/app/services/location-api.service";
import { WeatherApiService } from "src/app/services/weather-api.service";

@Component({
	selector: "app-current",
	templateUrl: "./current.component.html",
})
export class CurrentComponent implements OnInit {
	constructor(
		private locationService: LocationApiService,
		private weatherService: WeatherApiService
	) {}

	currentWeather!: Weather;
	currentMeteo!: string; // Meteo designe le temps en string, ex : "Nuageux, clair"...
	currentCity!: string;
	todayDate: string = this.getDate();

	getDate() {
		// Récupère la date du jour
		const date = new Date();
		const formatedDate = `
		${this.parseDay(date.getDay())} ${date.getDate()} ${this.parseMonth(
			date.getMonth()
		)}`;
		console.log(formatedDate);
		return formatedDate;
	}

	parseDay(value: number) {
		switch (value) {
			case 0:
				return "Lundi";
			case 1:
				return "Mardi";
			case 2:
				return "Mercredi";
			case 3:
				return "Jeudi";
			case 4:
				return "Vendredi";
			case 5:
				return "Samedi";
			case 6:
				return "Dimanche";
			default:
				return "";
		}
	}

	parseMonth(value: number) {
		switch (value) {
			case 0:
				return "Janvier";
			case 1:
				return "Février";
			case 2:
				return "Mars";
			case 3:
				return "Avril";
			case 4:
				return "Mai";
			case 5:
				return "Juin";
			case 6:
				return "Juillet";
			case 7:
				return "Août";
			case 8:
				return "Septembre";
			case 9:
				return "Octobre";
			case 10:
				return "Novembre";
			case 11:
				return "Décembre";
			default:
				return "";
		}
	}

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
		this.locationService.citySubject$.subscribe(
			async (res: Promise<string>) => {
				this.currentCity = await res;
			}
		);
	}
}
