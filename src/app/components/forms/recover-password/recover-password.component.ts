import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ValidateForm } from '../validateFormService/validateFomr-Service';
import { UserFacade } from 'src/app/facades/UserFacade';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent extends ValidateForm {

  public load: boolean = false;

  constructor(
    private userFacade:UserFacade,
    formBuilder: FormBuilder,
    dom: Renderer2,
    el: ElementRef
  ) {

    const form = formBuilder.group({
      userName: [],
      password: []
    });
    super(el, dom, form);
  }

  changePassword() {
    const [userName, password] = ["userName", "password"].map(el => this.form.get(el).value);
    if (this.isNotEmpty(userName) && this.isNotEmpty(password)) {
      this.userFacade.updatePassword(userName,password)
      this.load = true;
      setTimeout(() => {
        this.load = false;
      }, 500);
    } else {
      this.activeIvalidFeedback("name", "password");
    }
  }

}
