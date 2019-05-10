import { inject } from 'aurelia-framework';
import {PoiService} from "../../services/poi-service";

@inject(PoiService)
export class userSettings {
  constructor(private ds: PoiService) {}
}
