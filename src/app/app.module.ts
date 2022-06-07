import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { D3Module } from './D3/d3.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { UtilityModule } from './Utility/utility.module';
import { HttpClientModule } from '@angular/common/http';
import { ProgressComponent } from './progress/progress.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProgressComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UtilityModule,
    D3Module,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
