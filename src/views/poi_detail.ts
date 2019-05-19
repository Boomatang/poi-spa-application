import { inject, bindable } from 'aurelia-framework'
import { POI, PoiComment } from "../services/poi-types";
import {PoiService} from "../services/poi-service";

@inject(PoiService)
export class Poi_View{
  poi: POI;
  edit: Boolean;
  comments: PoiComment[];

  constructor(private ds: PoiService){
    // this.comments = this.poi.comments;

  }

  async activate(params) {
    this.poi = await this.ds.getPoiDetail(params.id)
  }

}

