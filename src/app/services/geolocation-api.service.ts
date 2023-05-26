import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class GeolocationApiService {
	constructor() {}

	currentCity: BehaviorSubject<any> = new BehaviorSubject(
		this.coordsToCity(this.getUserGeoLocation())
	);

	setCurrentCity(city: any) {
		this.currentCity.next(city);
	}

	getUserGeoLocation(): Promise<any> {
		return new Promise((resolve) => {
			navigator.geolocation.getCurrentPosition(
				async (pos) => {
					resolve(pos);
				},
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

	async coordsToCity(coordinates: any) {
		const coords = await coordinates;
		const latitude = coords.coords.latitude;
		const longitude = coords.coords.longitude;
		const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
		const json = await fetch(url).then((value) => value.json());
		return json.address.city;
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
}
