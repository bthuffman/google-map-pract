import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core';
import { GoogleMapComponent } from './google-map/google-map.component';

@NgModule({
  declarations: [
    AppComponent,
    GoogleMapComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCDOkdAi3ANRGBDqXWXaaliEJlLLm1I9h0',
      libraries: ['places']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }