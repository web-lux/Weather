import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from './main/components/main/app.component';
import { NotFoundComponent } from './main/components/not-found/not-found.component';
import { HeaderComponent } from './main/components/header/header.component';
import { FormComponent } from './main/components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WeatherApiService } from '../services/weather-api.service';

@NgModule({
  declarations: [
    AppComponent, 
    NotFoundComponent, 
    HeaderComponent, 
    FormComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [WeatherApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
