import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class GeolocationApiService {
	constructor(private http: HttpClient) {}

	getUserGeoLocation(): Promise<
		GeolocationPosition | { coords: { latitude: number; longitude: number } }
	> {
		return new Promise((resolve) => {
			navigator.geolocation.getCurrentPosition(
				(pos) => resolve(pos),
				() => {
					resolve({
						coords: {
							latitude: 48.86,
							longitude: 2.33,
						},
					});
				}
			);
		});
	}

	async cityToCoords(city: string): Promise<{
		coords: { latitude: number; longitude: number };
	}> {
		return new Promise(async (resolve) => {
			const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=fr&format=json`;
			const obj = await fetch(url);
			const json = await obj.json();
			resolve({
				coords: {
					latitude: json.results[0].latitude,
					longitude: json.results[0].longitude,
				},
			});
		});
	}

	// async getLocation(): Promise<any> {
	// 	const coordsObj: any = await this.getCoords();
	// 	const url = `https://nominatim.openstreetmap.org/reverse?lat=${coordsObj.coords.latitude}&lon=${coordsObj.coords.longitude}&format=json`;
	// 	return this.http.get(url);
	// }

	// getCoords() {
	// 	return new Promise((resolve, reject) => {
	// 		navigator.geolocation.getCurrentPosition((pos) => {
	// 			resolve(pos);
	// 		});
	// 	});
	// }
}
