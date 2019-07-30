import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RandomizerComponent } from './randomizer/randomizer.component';
import { RandomResultsComponent } from './random-results/random-results.component';

const routes: Routes = [
  { path: 'randomizer', component: RandomizerComponent},
  { path: 'random-results', component: RandomResultsComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
