import { inject } from 'aurelia-framework';
import {PoiService} from "../services/poi-service";
import {POI} from "../services/poi-types";

@inject(PoiService)
export class PoiCreate {
  pois: POI[];

  constructor(private ds: PoiService) {
    this.pois = ds.poi;
  }
}
