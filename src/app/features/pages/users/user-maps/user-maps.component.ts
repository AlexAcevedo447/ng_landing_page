
import { Component, OnInit,} from '@angular/core';
import { MapServiceService } from './map-service.service';

@Component({
  selector: 'app-user-maps',
  templateUrl:'./user-maps.component.html',
  styleUrls:['./user-maps.component.scss']
})

export class UserMapsComponent implements OnInit {
  
  constructor(private formUserMap:MapServiceService){}
  lat!: number;
  long!: number;
  confirmedAddress = true;

  mapa!: google.maps.Map;
  markers!: google.maps.Marker;
  ngOnInit(): void {
    this.dataMap();
  }
  dataMap() {
    this.formUserMap.getCoordinates()
      .subscribe((data: any) => {
        this.formUserMap.lat = data.results[0].position.lat;
        this.formUserMap.long = data.results[0].position.lon;
        this.lat = this.formUserMap.lat;
        this.long = this.formUserMap.long;
        this.initMap();
    });
  }

  confirmAddress() {
    this.formUserMap.confirmedAdress = true;
  }

  initMap(): void {
    const lat = this.lat;
    const long = this.long;

    const mapCoordinates = { lat: lat, lng: long };

    this.mapa = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
      
        center: mapCoordinates,
        zoom: 10,
      }
    );

    this.markers= new google.maps.Marker({
      position: mapCoordinates,
      map: this.mapa,
    });
  }

}
