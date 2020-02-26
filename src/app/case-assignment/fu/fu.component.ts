import { Component, OnInit, OnDestroy } from '@angular/core';
import { SetupService } from 'src/app/core/setup.service';
import { takeUntil, map, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-fu',
  templateUrl: './fu.component.html',
  styleUrls: ['./fu.component.scss']
})
export class FuComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  form: any;

  showCases = false;
  
  constructor(
    private setup: SetupService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
   
    this.setup.forms.pipe(
      takeUntil(this.ngUnsubscribe),
      filter((forms: any[]) => !!forms && !!forms.length),
      map((forms: any[]) => forms.find(form => form.label === "FU"))
    )
      .subscribe(form => {
        console.log(form);
        this.form = this.sanitizer.bypassSecurityTrustResourceUrl(form.link);
      });

  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
