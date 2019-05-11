import {User} from "../../services/poi-types";
import { bindable, inject } from "aurelia-framework";
import {PoiService} from "../../services/poi-service";

@inject(PoiService)
export class userSettings {
  @bindable
  user: User;

  constructor(private ps: PoiService) {}

    async updateUser(){
    console.log(this.user);

    await this.ps.updateUser(this.user);
  }

}
