import { inject } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import {PoiService} from "../../services/poi-service";
import {POI} from "../../services/poi-types";

@inject(PoiService)
export class PoiForm {
  name: string;
  description: string;
  long: string;
  lat: string;
  zone: string;
  imagePath: string;
  @bindable pois: POI[];

  constructor(private ds: PoiService) {}

  addPoi() {
    this.ds.createPoi(this.name, this.description, this.long, this.lat, this.zone, this.imagePath);
  }
}
