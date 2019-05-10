import { inject } from 'aurelia-framework'
import { POI } from "../services/poi-types";
import {PoiService} from "../services/poi-service";

@inject(PoiService)
export class Pois{
  poi: POI[];

  constructor(private ds: PoiService){
    this.poi = ds.poi;
  }
}

