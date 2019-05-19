import { bindable, inject } from "aurelia-framework";
import {PoiComment} from "../../services/poi-types";
import {PoiService} from "../../services/poi-service";

@inject(PoiService)
export class CommentAdd {
  @bindable
  comment: String = "Feed Me";
  @bindable()
  poi_id: String;

  constructor(private ps: PoiService) {}

  async addComment(){
    // console.log("I'm a comment; " + this.comment);
    // console.log("For poi; " + this.poi_id);

    await this.ps.addComment(this.poi_id, this.comment);
  }

}
