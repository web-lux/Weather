import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { LocationApiService } from "./location-api.service";

@Injectable({
	providedIn: "root",
})
export class WeatherApiService {
	public userWeather$: BehaviorSubject<Promise<Observable<any>>> =
		new BehaviorSubject(
			this.getWeather(this.locationService.getUserGeoLocation())
		);

	setUserWeather(weatherObj: any) {
		this.userWeather$.next(weatherObj);
	}

	constructor(
		private http: HttpClient,
		private locationService: LocationApiService
	) {}

	async getWeather(
		coordinates:
			| Promise<
					| GeolocationPosition
					| { coords: { latitude: number; longitude: number } }
			  >
			| { coords: { latitude: number; longitude: number } }
	): Promise<Observable<any>> {
		const coords = await coordinates;
		let latitude = coords.coords.latitude;
		let longitude = coords.coords.longitude;
		const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=auto&daily=temperature_2m_max,temperature_2m_min,weathercode&current_weather=true`;
		return this.http.get(url);
	}

	weatherCodeIntoString(weatherCode: number): string {
		if (weatherCode === 0) {
			return "Ciel dégagé";
		} else if (weatherCode === 1 || weatherCode === 2 || weatherCode === 3) {
			return "Partiellement nuageux";
		} else if (weatherCode === 45 || weatherCode === 48) {
			return "Brouillard";
		} else if (weatherCode === 51 || weatherCode === 53 || weatherCode === 55) {
			return "Bruine";
		} else if (weatherCode === 56 || weatherCode === 57) {
			return "Bruine glacial";
		} else if (weatherCode === 61 || weatherCode === 63 || weatherCode === 65) {
			return "Pluie";
		} else if (weatherCode === 66 || weatherCode === 67) {
			return "Pluie glaciale";
		} else if (weatherCode === 71 || weatherCode === 73 || weatherCode === 75) {
			return "Neige";
		} else if (weatherCode === 77) {
			return "Grêlons";
		} else if (weatherCode === 80 || weatherCode === 81 || weatherCode === 82) {
			return "Averse";
		} else if (weatherCode === 85 || weatherCode === 86) {
			return "Chute de neige";
		} else if (weatherCode === 95) {
			return "Orage";
		} else if (weatherCode === 96 || weatherCode === 99) {
			return "Orage avec grêle";
		} else {
			return "Météo inconnue";
		}
	}
}
