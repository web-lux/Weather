import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class LocationApiService {
	constructor() {}

	citySubject$: BehaviorSubject<Promise<string>> = new BehaviorSubject(
		this.coordsToCity(this.getUserGeoLocation())
	);

	setCitySubject(city: Promise<string>) {
		this.citySubject$.next(city);
	}

	getUserGeoLocation(): Promise<
		GeolocationPosition | { coords: { latitude: number; longitude: number } }
	> {
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

	async coordsToCity(
		coordinates: Promise<
			GeolocationPosition | { coords: { latitude: number; longitude: number } }
		>
	): Promise<string> {
		const coords = await coordinates;
		const latitude = coords.coords.latitude;
		const longitude = coords.coords.longitude;
		const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
		const json = await fetch(url).then((res) => res.json());
		return json.address.city;
	}

	async cityToCoords(city: string): Promise<{
		coords: { latitude: number; longitude: number };
	}> {
		return new Promise(async (resolve) => {
			const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=fr&format=json`;
			const json = await fetch(url).then((res) => res.json());
			if (json.results) {
				resolve({
					coords: {
						latitude: json.results[0].latitude,
						longitude: json.results[0].longitude,
					},
				});
			} else {
				alert("Ville non reconnue. Merci d'en vérifier l'ortographe.");
			}
		});
	}
}
