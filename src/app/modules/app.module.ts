import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from './main/components/main/app.component';
import { NotFoundComponent } from './main/components/not-found/not-found.component';
import { HeaderComponent } from './main/components/header/header.component';

@NgModule({
  declarations: [AppComponent, NotFoundComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
