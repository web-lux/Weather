import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CurrentComponent } from "./components/current/current.component";
import { ForecastComponent } from "./components/forecast/forecast.component";

@NgModule({
	declarations: [CurrentComponent, ForecastComponent],
	imports: [CommonModule],
})
export class WeatherModule {}
