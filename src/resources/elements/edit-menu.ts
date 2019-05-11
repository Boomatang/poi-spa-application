import { bindable, inject } from "aurelia-framework";

import {POI} from "../../services/poi-types";
import {PoiService} from "../../services/poi-service";

@inject(PoiService)
export class EditMenu {
  @bindable
  poi: POI;
  @bindable
  edit: Boolean;

  constructor(private ds: PoiService){}

  async deletePoi(){

    this.ds.deleteCurrentPOI(this.poi._id)
  }

  async editPoi(){
    console.log("I am editing");
    console.log(this.edit);
    this.edit = true;
    // this.ds.editCurrentPOI(this.poi._id)
  }

}
