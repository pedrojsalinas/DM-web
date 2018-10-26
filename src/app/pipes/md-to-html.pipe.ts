import { Pipe, PipeTransform } from '@angular/core';
import { PostService } from '../servicios/post/post.service';

@Pipe({
  name: 'mdToHtml'
})
export class MdToHtmlPipe implements PipeTransform {

  constructor(private contentful: PostService ) {}

  transform(value: string): any {
    return this.contentful.markdownToHtml(value);
  }
}
