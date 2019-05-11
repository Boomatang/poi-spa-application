import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { LeafletMap } from "../../services/leaflet-map";
import {POI} from "../../services/poi-types";
import {PoiService} from "../../services/poi-service";

@inject(PoiService)
export class PoiMap {
  mapId = "poi-map";
  mapheight = 300;
  map: LeafletMap;
  pois: POI[];
  @bindable
  poi: POI;


  constructor(private ps: PoiService){
    this.pois = ps.poi;

  }

  renderPois() {
    if(this.map){

      for (let poi of this.pois) {


        this.map.addMarker(poi.geo, poi.name, 'Island');
      }
    }
  }

  longLatValues(){
    const returnValue = {
      lat: 53.27,
      long: -7.778
    };
    if(this.poi){
      returnValue.long =  this.poi.geo.long;
      returnValue.lat = this.poi.geo.lat;
    }
    return returnValue;
  }

  zoomLevel(){
    let returnValue = 7;
    if(this.poi){
      returnValue = 12;
    }
    return returnValue;
  }

  attached(){
    const mapConfig = {
      location: this.longLatValues(),
      zoom: this.zoomLevel(),
      minZoom: 7
    };
    this.map = new LeafletMap(this.mapId, mapConfig, 'Terrain');
    this.map.addLayerGroup('Island');

    this.map.showLayerControl();
    this.map.showZoomControl();

    this.renderPois();

  }
}
