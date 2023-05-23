import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ForecastComponent } from "./components/forecast/forecast.component";
import { CurrentComponent } from "./components/current/current.component";

@NgModule({
	declarations: [CurrentComponent, ForecastComponent],
	imports: [CommonModule],
})
export class WeatherModule {}
