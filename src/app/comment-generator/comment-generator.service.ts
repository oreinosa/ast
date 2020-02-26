import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Inbound } from './inbound/inbound';
import { Chat } from './chat/chat';
import { NgForm } from '@angular/forms';
import { Transfer } from './transfer/transfer';
import { SetupService } from '../core/setup.service';
import { User } from '../shared/models/user';
import { Followup } from './followup/followup';
import { Clipboard } from 'ts-clipboard';

@Injectable({
  providedIn: 'root'
})
export class CommentGeneratorService {
  commentSubject = new BehaviorSubject<string>("");
  specialization = new BehaviorSubject<string>("");
  scopes: {};

  restoreCommentLimit = 5;
  constructor(
    private setupService: SetupService
  ) {
    this.setupService.scopes.subscribe(scopes => this.scopes = scopes);
  }

  setBackupComment(comment: any, type: string) {
    window.localStorage.setItem(type, JSON.stringify(comment));
  }

  setRestoreComment(comment: any, type: string) {
    let restoreType = `${type}-restore`;
    let currentComments: any[] = this.getBackupComment(restoreType);
    if (!!currentComments) {
      if (currentComments.length >= this.restoreCommentLimit) {
        currentComments.splice(this.restoreCommentLimit - 1, 1);
      }
      this.setBackupComment([comment, ...currentComments], restoreType);

    } else {
      this.setBackupComment([comment], restoreType);
    }
  }

  getBackupComment(type: string) {
    return JSON.parse(window.localStorage.getItem(type));
  }

  generateComment(body: Inbound | Chat | Transfer | Followup, type: string) {
    let comment = '';

    // console.log(`comment type ${type}`);
    comment += `--- Case handled by ${this.specialization.getValue()} ---\n\n`;

    switch (type) {
      case "inbound":
        comment += this.inboundComment(body as Inbound);
        break;
      case 'chat':
        comment += this.chatComment(body as Chat);
        break;
      case 'transfer':
        comment += this.transferComment(body as Transfer);
        break;
      case 'followup':
        comment += this.followupComment(body as Followup);
        break;
    }
    if (body['noCdmLicenses']) {
      comment += "\n\n #NoCdmLicenses"
    }
    return comment;
  }

  updateComment(comment) {
    this.commentSubject.next(comment);
    Clipboard.copy(comment);
  }

  inboundComment(body: Inbound): string {
    let comment = ``;

    if (body.domain || body.name || body.phone || body.email) {
      comment += '|===== Contact information =====|\n';
      comment += body.domain ? `- ⚙️ Domain : ${body.domain}\n` : "";
      comment += body.name ? `- 📓 Name : ${body.name}\n` : "";
      comment += body.phone ? `- 📞 Phone : ${body.phone}\n` : "";
      comment += body.email ? `- 📧 Email address : ${body.email}\n` : "";
      comment += '\n';
    }

    if (body.reason || body.identification || body.reasoning) {
      comment += '|===== CCA information =====|\n';
      comment += body.reason ? `- 📎 Reason for the call : \n${body.reason}\n\n` : "";
      comment += body.identification ? `- 📋 Issue identification : \n${body.identification}\n\n` : "";
      comment += body.reasoning ? `- 📝 Selected TAG reasoning : \n${body.reasoning}\n\n` : "";
      comment += '\n';
    }

    if (body.featureIdea || body.secondary || body.resolution) {
      comment += '|===== Case relevant information =====|\n';
      comment += body.featureIdea ? `- 💡 Feature idea : \n${body.featureIdea}\n\n` : "";
      comment += body.secondary ? `- 🔦 Relevant information or secondary issues/questions : \n${body.secondary}\n\n` : "";
      comment += body.resolution ? `- 💡 Issue resolution : \n${body.resolution}\n\n` : "";
      comment += '\n';
    }

    if (body.followupDate || body.status) {
      comment += '|===== Additional information =====|\n';
      comment += body.followupDate ? `- 📅 Next follow up date : \n${body.followupDate}\n\n` : "";
      comment += body.status ? `- 📊 Case status : ${body.status}\n` : "";
      comment += '\n';
    }

    if (body.pinVerification || body.emailVerification) {
      comment += '|===== Email and PIN verification =====|\n';
      comment += body.pinVerification ? `- 📌 PIN verification : \n${body.pinVerification}\n\n` : "";
      comment += body.emailVerification ? `- 🚩 Email verification : \n${body.emailVerification}` : "";
      // comment += '\n';
    }

    return comment;
  }

  chatComment(body: Chat): string {
    let comment = ``;

    if (body.reason || body.identification || body.reasoning) {
      comment += '|===== CCA information =====|\n';
      comment += body.reason ? `- 📎 Reason for the call : \n${body.reason}\n\n` : "";
      comment += body.identification ? `- 📋 Issue identification : \n${body.identification}\n\n` : "";
      comment += body.reasoning ? `- 📝 Selected TAG reasoning : \n${body.reasoning}\n\n` : "";
      comment += '\n';
    }

    if (body.featureIdea || body.secondary || body.resolution) {
      comment += '|===== Case relevant information =====|\n';
      comment += body.featureIdea ? `- 💡 Feature idea : \n${body.featureIdea}\n\n` : "";
      comment += body.secondary ? `- 🔦 Relevant information or secondary issues/questions : \n${body.secondary}\n\n` : "";
      comment += body.resolution ? `- 💡 Issue resolution : \n${body.resolution}\n\n` : "";
      comment += '\n';
    }

    if (body.followupDate || body.status) {
      comment += '|===== Additional information =====|\n';
      comment += body.followupDate ? `- 📅 Next follow up date : \n${body.followupDate}\n\n` : "";
      comment += body.phone ? `- 📞 Phone : ${body.phone}\n` : "";
      comment += body.status ? `- 📊 Case status : ${body.status}\n` : "";
      comment += '\n';
    }

    return comment;
  }

  transferComment(body: Transfer) {
    let comment = ``;
    if (body.name || body.phone || body.email) {
      comment += '|===== Contact information =====|\n';
      comment += body.name ? `- 📓 Name : ${body.name}\n` : "";
      comment += body.phone ? `- 📞 Phone : ${body.phone}\n` : "";
      comment += body.email ? `- 📧 Email address : ${body.email}\n` : "";
      comment += body.contactTime ? `- 💻 Desired contact time : ${body.contactTime}\n` : "";
      comment += body.contactChannel ? `- ⏺ Desired contact channel : ${body.contactChannel}\n` : "";
      comment += '\n';
    }

    if (body.problem || body.steps || body.transferReason) {
      comment += '|===== Case action plan =====|\n';
      comment += body.problem ? `- 🤒 Problem statement : \n${body.problem}\n\n` : "";
      comment += body.steps ? `- 🔧 Steps performed : \n${body.steps}\n\n` : "";
      comment += body.transferReason ? `- ⏩ Transfer reason : \n${body.transferReason}\n\n` : "";
      comment += '\n';
    }

    if (body.pinVerification) {
      comment += '|===== PIN verification =====|\n';
      comment += body.pinVerification ? `- 📌 PIN verification : \n${body.pinVerification}\n\n` : "";
      comment += '\n';
    }
    let specialization = this.specialization.getValue();
    specialization = specialization.includes('Generalist') ? "Generalist" : specialization;
    const scopeReference = this.scopes[specialization];
    if (scopeReference) {
      comment += `\n*${specialization} scope of support: ${scopeReference}`;
    }
    comment += `\n*How to transfer a case (latest): ${this.scopes["Transfer"]}`;
    return comment;
  }

  followupComment(body: Followup): string {
    let comment = ``;
    if (body.method || body.discussed || body.next || body.featureIdea || body.followupDate || body.status) {
      comment += '|===== Case action plan =====|\n';
      comment += body.discussed ? `What was discussed in the call : \n${body.discussed}\n\n` : "";
      comment += body.next ? `Suggested next steps : \n${body.next}\n\n` : "";
      comment += body.method ? `Channel of communication : \n${body.method}\n\n` : "";
      comment += body.featureIdea ? `Feature ideas status : \n${body.featureIdea}\n\n` : "";
      comment += body.followupDate ? `Next follow up date : \n${body.followupDate}\n\n` : "";
      comment += body.status ? `Case status : ${body.status}\n\n` : "";
    }
    return comment;
  }

  resetComment(form: NgForm) {
    form.resetForm();
    this.commentSubject.next("");
  }
}
