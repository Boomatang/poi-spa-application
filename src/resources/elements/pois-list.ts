import { bindable } from "aurelia-framework";
import {POI} from "../../services/poi-types";

export class PoisList {
  @bindable
  pois: POI[];

}
