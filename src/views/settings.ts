import { inject, bindable } from 'aurelia-framework'
import {User} from "../services/poi-types";
import {PoiService} from "../services/poi-service";

@inject(PoiService)
export class Settings{
  @bindable
  user: User;

  constructor(private ds: PoiService) {
    this.user = ds.user;
  }


}

