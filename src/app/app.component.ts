import { Component, OnInit, ViewChild } from '@angular/core';

declare const myTest: any;
declare const initMap: any;

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

myTest();
}