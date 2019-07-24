/// <reference types="@types/googlemaps" />
import { Component, ViewChild } from '@angular/core';
import {} from 'googlemaps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  // gmapElement is a reference to <div #gmap> inside app.component.html file. ViewChild directive creates a direct link between <div> element and a gmapElement member variable.
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  // Inside ngOnInit() life cycle hook, we shall create configuration object for GMap specifying default center, zoom level and map type. We shall pass this object to google.maps.Map constructor which shall return new Map object which we shall retain in member variable map for later access.
  ngOnInit() {
    var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  setMapType(mapTypeId: string) {
    this.map.setMapTypeId(mapTypeId)    
  }
  
  latitude:number;
  longitude:number;

  setCenter(e:any){
    e.preventDefault();
    this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));
  }

}
