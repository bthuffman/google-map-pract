import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMapComponent } from '/google-map/google-map.component';
// declare const myTest: any;
// declare const initMap: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {

  // onClick() {
  // myTest();
    initMap();
  }
  
// }

// myTest();
}