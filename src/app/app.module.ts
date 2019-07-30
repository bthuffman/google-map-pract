import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core';
import { RandomizerComponent } from './randomizer/randomizer.component';
import { AppRoutingModule } from './app-routing.module';
import { RandomResultsComponent } from './random-results/random-results.component';

@NgModule({
  declarations: [
    AppComponent,
    RandomizerComponent,
    RandomResultsComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCDOkdAi3ANRGBDqXWXaaliEJlLLm1I9h0',
      libraries: ['places']
    }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }