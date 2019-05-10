import { inject } from 'aurelia-framework'
import { POI } from "../services/poi-types";
import {PoiService} from "../services/poi-service";

@inject(PoiService)
export class Poi_View{
  poi: POI;

  constructor(private ds: PoiService){}

  async activate(params) {
    this.poi = await this.ds.getPoiDetail(params.id)
  }

}

