import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/compos/navbar/navbar.component';
import { FourofourComponent } from './shared/compos/fourofour/fourofour.component';
import { FooterComponent } from './shared/compos/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FourofourComponent,
    FooterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
