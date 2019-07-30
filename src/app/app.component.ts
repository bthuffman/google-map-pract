import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
 
//Component is a type of directive used to associate a template with a class. 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
 implements OnInit {
  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  name: string;
  request = { 
    type: ['restaurant']
  }
  map;
 
  //Any directive, component, and element which is part of component template (i.e. a child of the parent) is accessed as ViewChild. If a parent component wants access to a child component then it uses ViewChild or ContentChild. The @ViewChild decorator is a template querying mechanism that is local to the component and cannot inject anything inside the templates of its child or parent components. 
  @ViewChild('search')
  // ElementRef is a wrapper around a native element inside of a View. Allows you to use Angular templates and data binding to access DOM elements without reference to the native element.
  public searchElementRef: ElementRef;
 
  //The Constructor is a default method of the class that is executed when the class is instantiated and ensures proper initialization of fields in the class and its subclasses. Angular or better Dependency Injector (DI) analyzes the constructor parameters and when it creates a new instance by calling new MyClass() it tries to find providers that match the types of the constructor parameters, resolves them and passes them to the constructor. 
 //specifies what the parameters (injectable services) will be. In this case the constructor is asking for an injected instance of mapsAPILoader and ngZoneand their associated type and metadata. 
// you should use constructor() to setup Dependency Injection and not much else. ngOnInit() is better place to "start" - it's where/when components' bindings are resolved.
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }
 
 //A lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. Used to  to handle any additional initialization tasks.
  ngOnInit() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
    
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -33.8688, lng: 151.2195},
        zoom: 13,
        // mapTypeId: 'roadmap'
      });

      // Create the search box and link it to the UI element.
      var input = this.searchElementRef.nativeElement;
      var searchBox = new google.maps.places.SearchBox(input);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      // Bias the SearchBox results towards current map's viewport.
      map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
      });

      var markers = [];
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
          marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
          if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
          }
          var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          // Create a marker for each place.
          markers.push(new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
          }));

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });
    }
    )}
 }
