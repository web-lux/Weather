import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CurrentComponent } from "src/app/modules/weather/components/current/current.component";
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
		// LOG
		this.weatherService.userWeather$.subscribe((value: any) =>
			console.log(value)
		);

		// cityName est un string égal à la valeur du formulaire
		const cityName = this.cityForm.value.cityName;

		// obs est égal à une promesse d'observable qui contient
		// la météo de la ville cityName
		const obs = await this.weatherService.getWeather(
			this.locationService.cityToCoords(cityName)
		);

		// on change la valeur d'userWeather à l'observable ainsi reçu
		this.weatherService.setUserWeather(
			await this.weatherService.getWeather(
				this.locationService.cityToCoords(cityName)
			)
		);

		//LOG
		this.weatherService.userWeather$.subscribe((value: any) =>
			console.log(value)
		);

		console.log();

		// this.weatherService.getWeather(this.locationService.cityToCoords(cityName));
	}
}
