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

	public currentWeather!: any;

	async ngOnInit() {
		/* 
		Au lancement de la page, $userWeather est initialisé au résultat de la fonction 
		getWeather avec la géolocalisation en argument. 
		Elle renvoie une promesse d'Observable.
		*/
		this.weatherService.setUserWeather(
			await this.weatherService.getWeather(
				this.geolocationService.getUserGeoLocation()
			)
		);

		/* 
		On souscrit à l'observable du service weatherService dont on a changé la valeur 
		à l'instant, et on initialise la propriété currentWeather à sa valeur.
		*/
		this.weatherService.userWeather$.subscribe((res: any) => {
			this.currentWeather = res;
			console.warn(res);
		});

		// this.userWeather = this.weatherService.getWeather(
		// 	this.geolocationService.getUserGeoLocation()
		// );

		// const promise: any = await this.geolocationService.cityToCoords("Lille");
		// let json = await promise.json();
		// console.log(json.results[0].latitude);

		// console.log(this.weatherService.getUserWeather());

		// this.weatherService.getWeather();
		// console.log(this.weatherService.userWeather());
		// const tamer = await this.geolocationService.getLocation();
		// tamer.subscribe((res: any) => {
		// 	this.userLocation = res;
		// 	console.log(res);
		// });
	}
}
