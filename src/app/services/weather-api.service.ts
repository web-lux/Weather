import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class WeatherApiService {
	public userWeather$!: Observable<any>;

	getUserWeather() {
		return this.userWeather$;
	}

	setUserWeather(arg: any) {
		this.userWeather$ = arg;
	}

	constructor(private http: HttpClient) {}

	// Renvoie une promesse d'observable et prend comme argument une promesse d'objet
	// contenant les coordonnées dont on souhaite récupérer la météo

	async getWeather(
		coordinates: Promise<
			GeolocationPosition | { coords: { latitude: number; longitude: number } }
		>
	): Promise<Observable<any>> {
		const coords = await coordinates;
		let latitude = coords.coords.latitude;
		let longitude = coords.coords.longitude;
		const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`;
		return this.http.get(url);
	}
}
