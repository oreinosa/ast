import { Component, OnInit, } from '@angular/core';
import { Subject } from 'rxjs';
import { SetupService } from '../core/setup.service';
import { takeUntil, filter } from 'rxjs/operators';
import { Link } from '../shared/models/link';
import { CommentGeneratorService } from './comment-generator.service';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-comment-generator',
  templateUrl: './comment-generator.component.html',
  styleUrls: ['./comment-generator.component.scss']
})
export class CommentGeneratorComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  links: Link[] = [];
  specialization = "";
  specializations = [
    "Generalist (Phone)",
    "Generalist (Chat)",
    "Upsell",
    "Devices",
    "Bi-Panel",
    "Collab",
    "Email",
    "MSM"
  ];

  constructor(
    private setup: SetupService,
    private commentGenerator: CommentGeneratorService
  ) { }

  ngOnInit() {
    this.setup.actions.pipe(
      takeUntil(this.ngUnsubscribe),
      filter(actions => !!actions.length)
    )
      .subscribe(actions => this.links = actions.find(action => action.route === "comment-generator").children);

    this.setup.user.pipe(
      takeUntil(this.ngUnsubscribe),
      filter(user => !!user),
    )
      .subscribe((user: User) => {
        let specialization = user.specialization;
        if(specialization === "Generalist") specialization = `Generalist (${user.channel})`;
        this.changeSpecialization(specialization);
        this.specialization = specialization; 
      });

  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  changeSpecialization(specialization: string) {
    this.commentGenerator.specialization.next(specialization);
  }

}
