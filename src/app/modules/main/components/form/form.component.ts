import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GeolocationApiService } from "src/app/services/geolocation-api.service";
import { WeatherApiService } from "src/app/services/weather-api.service";

@Component({
	selector: "app-form",
	templateUrl: "./form.component.html",
})
export class FormComponent implements OnInit {
	cityForm!: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private weatherService: WeatherApiService,
		private locationService: GeolocationApiService
	) {}
	ngOnInit(): void {
		this.cityForm = this.formBuilder.group({
			cityName: [null, [Validators.required]],
		});
	}

	async onSubmitForm() {
		const cityName = this.cityForm.value.cityName;
		this.locationService.setCurrentCity(cityName);
		this.weatherService.setUserWeather(
			await this.weatherService.getWeather(
				this.locationService.cityToCoords(cityName)
			)
		);
	}
}
