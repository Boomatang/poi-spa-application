import { bindable, inject } from "aurelia-framework";

import {POI} from "../../services/poi-types";
import {PoiService} from "../../services/poi-service";

@inject(PoiService)
export class PoiDesc {
  @bindable
  poi: POI;
  @bindable
  edit: Boolean;

  constructor(private ps: PoiService) {
  }

  async update(){
    await this.ps.updateCurrentPOI(this.poi);
    this.edit = false
  }

}
