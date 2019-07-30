import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { setCurrentInjector } from '@angular/core/src/di/injector';
 
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
  
 
  //Any directive, component, and element which is part of component template (i.e. a child of the parent) is accessed as ViewChild. If a parent component wants access to a child component then it uses ViewChild or ContentChild. The @ViewChild decorator is a template querying mechanism that is local to the component and cannot inject anything inside the templates of its child or parent components. 
  @ViewChild('search')
  // ElementRef is a wrapper around a native element inside of a View. Allows you to use Angular templates and data binding to access DOM elements without reference to the native element.
  public searchElementRef: ElementRef;
 
  @ViewChild('map')
  public mapElement: ElementRef;
  //The Constructor is a default method of the class that is executed when the class is instantiated and ensures proper initialization of fields in the class and its subclasses. Angular or better Dependency Injector (DI) analyzes the constructor parameters and when it creates a new instance by calling new MyClass() it tries to find providers that match the types of the constructor parameters, resolves them and passes them to the constructor. 
 //specifies what the parameters (injectable services) will be. In this case the constructor is asking for an injected instance of mapsAPILoader and ngZoneand their associated type and metadata. 
// you should use constructor() to setup Dependency Injection and not much else. ngOnInit() is better place to "start" - it's where/when components' bindings are resolved.
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }
 
 //A lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. Used to  to handle any additional initialization tasks.
  ngOnInit() {
   // console.log(this.mapElement)
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
    this.geoCoder = new google.maps.Geocoder;
    this.setCurrentLocation();
    }
    )}
    
      // Get Current Location Coordinates
  private setCurrentLocation() {
    // console.log(navigator);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
        //console.log(this.latitude);
       // console.log(this.longitude);


        this.setDefaultBounds();
        this.searchRestaurants;
        });
      }
    }

  setDefaultBounds(){
    var defaultBounds = new google.maps.LatLngBounds(
    //TODO move to two objects and set each to a constant variable (lat/long)
    // This is the latitude and longitude of 10 miles 0.14492753623 
    {
      lat:this.latitude-0.14492753623, lng:this.longitude-0.14492753623
    }, 
    {
      lat:this.latitude+0.14492753623, 
    lng:this.longitude+0.14492753623
    }) 
    // Create the search box and link it to the UI element.
    var input = this.searchElementRef.nativeElement;
    var searchBox = new google.maps.places.SearchBox(input, {bounds: defaultBounds});
    // Listen for the event fired when the user selects a prediction and retrieve more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        console.log("Failed to find place")
        return;
      }

      // Clear out the old markers.
      this.markers.forEach(function(marker) {
        marker.setMap(null);
      });
      this.markers = [];

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
        this.markers.push(new google.maps.Marker({
          // map: map,
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
    });
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      //console.log(results);
      //console.log("This is the status " + status);
      
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
      //console.log(this.address);
    });
  }
  markerDragEnd($event: MouseEvent) {
    // console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  searchRestaurants(){
    var map = new google.maps.Map(this.searchElementRef.nativeElement, 
      {center: {          
        lat:this.latitude,
        lng:this.longitude
        }
      });
    //console.log({lat:this.latitude,
      //lng:this.longitude});
    var request = {
      // location: albuquerque,
      // radius: '50000',
      keyword: "restaurant"
      };

    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
    }

    callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
      
      let randomNumber = Math.floor(Math.random() * Math.floor(10));
      console.log(randomNumber);
      
      let place = results[randomNumber];

      this.latitude = results.coords.lat;
      this.longitude = results.coords.lng;
      this.getAddress(this.latitude, this.longitude);
      // createMarker(results[randomNumber]);
      console.log(this.latitude);
      console.log(this.longitude);
      }
    }

    // createMarker(place) {
    //   var marker = new google.maps.Marker({
    //     map: map,
    //     position: place.geometry.location
    //   });
    
    //   google.maps.event.addListener(marker, 'click', function() {
    //     infowindow.setContent(place.name);
    //     infowindow.open(map, this);
    //   });
 }
