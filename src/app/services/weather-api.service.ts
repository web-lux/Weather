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
		} else if (weatherCode === 1) {
			return "Légéremment nuageux";
		} else if (weatherCode === 2) {
			return "Plutôt nuageux";
		} else if (weatherCode === 3) {
			return "Nuageux";
		} else if (weatherCode === 45 || weatherCode === 48) {
			return "Brumeux";
		} else if (weatherCode === 51) {
			return "Bruine légère";
		} else if (weatherCode === 53) {
			return "Bruine";
		} else if (weatherCode === 55) {
			return "Bruine intense";
		} else if (weatherCode === 56) {
			return "Bruine glaciale légère";
		} else if (weatherCode === 57) {
			return "Bruine glaciale dense";
		} else if (weatherCode === 61) {
			return "Légère pluie";
		} else if (weatherCode === 63) {
			return "Pluie";
		} else if (weatherCode === 65) {
			return "Pluie intense";
		} else if (weatherCode === 66 || weatherCode === 67) {
			return "Pluie glaciale";
		} else if (weatherCode === 71) {
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

	getImagePath(weatherCode: number) {
		if (weatherCode === 0) {
			return "../../../../../assets/clear.png";
		} else if (weatherCode === 1) {
			return "../../../../../assets/mainly-clear.png";
		} else if (weatherCode === 2) {
			return "../../../../../assets/partly-cloudy.png";
		} else if (weatherCode === 3) {
			return "../../../../../assets/overcast.png";
		} else if (weatherCode === 45 || weatherCode === 48) {
			return "../../../../../assets/fog.png";
		} else if (weatherCode === 51 || weatherCode === 53 || weatherCode === 55) {
			return "../../../../../assets/drizzle.png";
		} else if (weatherCode === 56 || weatherCode === 57) {
			return "../../../../../assets/rain.png";
		} else if (weatherCode === 61 || weatherCode === 63 || weatherCode === 65) {
			return "../../../../../assets/rain.png";
		} else if (weatherCode === 66 || weatherCode === 67) {
			return "../../../../../assets/rain.png";
		} else if (weatherCode === 71 || weatherCode === 73 || weatherCode === 75) {
			return "../../../../../assets/snow.png";
		} else if (weatherCode === 77) {
			return "../../../../../assets/snow.png";
		} else if (weatherCode === 80 || weatherCode === 81 || weatherCode === 82) {
			return "../../../../../assets/rain.png";
		} else if (weatherCode === 85 || weatherCode === 86) {
			return "../../../../../assets/snow.png";
		} else if (weatherCode === 95) {
			return "../../../../../assets/thunderstorm.png";
		} else if (weatherCode === 96 || weatherCode === 99) {
			return "../../../../../assets/thunderstorm.png";
		} else {
			return "../../../../../assets/clear.png";
		}
	}
}
