import { bindable } from "aurelia-framework";
import {PoiComment} from "../../services/poi-types";

export class CommentBasic {
  @bindable
  comment: PoiComment;

}
