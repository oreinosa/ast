import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'agent-support-tool';
  constructor(
  ) {
    if (environment.production) {
      window.addEventListener("beforeunload", function (e) {
        var confirmationMessage = "Are you sure that you want to close the Agent Support Tool?";
        e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
        return confirmationMessage;              // Gecko, WebKit, Chrome <34
      });
    }

  }

}
