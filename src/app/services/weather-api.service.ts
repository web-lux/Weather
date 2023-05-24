import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { GeolocationApiService } from "./geolocation-api.service";

@Injectable({
	providedIn: "root",
})
export class WeatherApiService {
	public userWeather$: BehaviorSubject<any> = new BehaviorSubject(
		this.getWeather(this.locationService.getUserGeoLocation())
	);

	setUserWeather(arg: any) {
		this.userWeather$.next(arg);
	}

	constructor(
		private http: HttpClient,
		private locationService: GeolocationApiService
	) {}

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
