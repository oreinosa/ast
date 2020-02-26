import { Pipe, PipeTransform } from '@angular/core';
import { CommentGeneratorService } from './comment-generator.service';

@Pipe({
  name: 'getCommentString'
})
export class GetCommentStringPipe implements PipeTransform {

  constructor(private comment: CommentGeneratorService){}
  transform(comment: any, type: string): any {
    return this.comment.generateComment(comment, type.split("-")[0]);
  }

}
