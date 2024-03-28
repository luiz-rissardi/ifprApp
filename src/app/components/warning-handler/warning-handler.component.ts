import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Listen } from 'src/app/core/services/interfaces/warningHandler/listen';
import { WarningHandlerService } from 'src/app/core/services/warningHandler/warning-handler.service';

@Component({
  selector: 'app-warning-handler',
  templateUrl: './warning-handler.component.html',
  styleUrls: ['./warning-handler.component.scss']
})
export class WarningHandlerComponent implements OnInit {

  message: string = "";
  constructor(@Inject(WarningHandlerService) private listenHander: Listen, private dom: Renderer2) {
  }


  ngOnInit(): void {

    this.listenHander.listenFeedBack()
      .subscribe(data => {
        const { message, typeFeedback } = JSON.parse(data);
        this.message = message;
        const el = this.dom.selectRootElement("#warningHandler", true);
        this.dom.removeClass(el, "feedback-valid");
        this.dom.removeClass(el, "feedback-invalid");
        this.dom.addClass(el, `feedback-${typeFeedback}`);
        this.ShowToast(3000, el, typeFeedback);
      })
  }

  private ShowToast(time: number, el: Element, typeFeedback: string) {
    setTimeout(() => {
      el.classList.remove(`feedback-${typeFeedback}`)
    }, time);
  }
}
