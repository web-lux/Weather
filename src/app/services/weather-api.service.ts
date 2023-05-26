import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { GeolocationApiService } from "./geolocation-api.service";

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
		const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=auto&daily=temperature_2m_max,temperature_2m_min,weathercode&current_weather=true`;
		return this.http.get(url);
	}

	weatherCodeIntoString(weatherCode: number): string {
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
}
