import { bindable, inject } from "aurelia-framework";
import {POI, PoiComment} from "../../services/poi-types";
import {PoiService} from "../../services/poi-service";
import {EventAggregator} from 'aurelia-event-aggregator';
import {CommentUpdate} from "../../services/messages";

@inject(PoiService, EventAggregator)
export class CommentSection {
  @bindable
  poi: POI;

  constructor(private ps: PoiService, private ea: EventAggregator, poi){
    this.poi = poi;
    ea.subscribe(CommentUpdate, msg => {
      const comment = msg.comment;
      const poi_id = msg.id;

      console.log("a: " + this.poi._id + " b: " + poi_id);
      console.log(comment);

      if (this.poi._id === poi_id){
        this.poi.comments.push(comment);
        this.poi;
        console.log("I was here");
      }
    })
  }

}
