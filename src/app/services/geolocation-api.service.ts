import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class GeolocationApiService {
	constructor(private http: HttpClient) {}

	async getLocation(): Promise<any> {
		const coordsObj: any = await this.getCoords();
		const url = `https://nominatim.openstreetmap.org/reverse?lat=${coordsObj.coords.latitude}&lon=${coordsObj.coords.longitude}&format=json`;
		return this.http.get(url);
	}

	getCoords() {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition((pos) => {
				resolve(pos);
			});
		});
	}
}
