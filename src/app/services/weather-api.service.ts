import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class WeatherApiService {
	constructor(private http: HttpClient) {}

	async getWeather(param: any) {
		const coords = await param;
		let latitude = coords.coords.latitude;
		let longitude = coords.coords.longitude;
		const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`;
		return this.http.get(url);
	}
}
