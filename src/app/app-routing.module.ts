import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentComponent } from './modules/weather/components/current/current.component';
import { ForecastComponent } from './modules/weather/components/forecast/forecast.component';
import { NotFoundComponent } from './modules/main/components/not-found/not-found.component';

const routes: Routes = [
  // Index
  {
    path: 'index',
    component: CurrentComponent,
  },

  // Forecast
  {
    path: 'forecast',
    component: ForecastComponent,
  },

  // Default
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/index',
  },

  // Wildcard
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
