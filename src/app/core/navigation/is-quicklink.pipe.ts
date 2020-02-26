import { Pipe, PipeTransform } from '@angular/core';
import { Link } from 'src/app/shared/models/link';

@Pipe({
  name: 'isQuickLink'
})
export class IsQuicklinkPipe implements PipeTransform {

  transform(link: Link, quickLinks: Link[], refresh?: boolean): boolean {
    if (link.route && quickLinks) {
      // console.log(quickLinks);
      return quickLinks.findIndex(_link => _link.route === link.route) >= 0;
    }
    return false;
  }

}
