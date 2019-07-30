import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';

@Component({
  selector: 'app-random-results',
  templateUrl: './random-results.component.html',
  styleUrls: ['./random-results.component.css']
})
export class RandomResultsComponent implements OnInit {
  map;
  service;
  inforwindow;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
  }

}
