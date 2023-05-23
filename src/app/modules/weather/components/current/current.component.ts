import { Component, OnInit } from "@angular/core";
import { GeolocationApiService } from "src/app/services/geolocation-api.service";

@Component({
	selector: "app-current",
	templateUrl: "./current.component.html",
})
export class CurrentComponent implements OnInit {
	userLocation!: any;

	constructor(private geolocationService: GeolocationApiService) {}

	async ngOnInit() {
		const temp = await this.geolocationService.getLocation();
		temp.subscribe((res: any) => {
			this.userLocation = res;
			console.log(res);
		});
	}
}
