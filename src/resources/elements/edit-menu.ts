import { bindable } from "aurelia-framework";
import {POI} from "../../services/poi-types";
import {PoiService} from "../../services/poi-service";

export class EditMenu {
  @bindable
  poi: POI;

  constructor(private ds: PoiService){}

  async deletePoi(){
    console.log("Am I working");

    this.ds.deleteCurrentPOI(this.poi._id)
  }

}
