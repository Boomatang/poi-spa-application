import {PoiComment} from "./poi-types";

export class CommentUpdate {
  comment: PoiComment;
  id: string;
  constructor(comment: PoiComment, id: string) {
    this.comment = comment;
    this.id = id;

  }
}
