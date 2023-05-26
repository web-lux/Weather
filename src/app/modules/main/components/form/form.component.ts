import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LocationApiService } from "src/app/services/location-api.service";
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
		private locationService: LocationApiService
	) {}
	ngOnInit(): void {
		this.cityForm = this.formBuilder.group({
			cityName: [null, [Validators.required]],
		});
	}

	onSubmitForm() {
		const cityName = this.cityForm.value.cityName;
		this.locationService.setCitySubject(cityName);
		this.weatherService.setUserWeather(
			this.weatherService.getWeather(
				this.locationService.cityToCoords(cityName)
			)
		);
	}
}
