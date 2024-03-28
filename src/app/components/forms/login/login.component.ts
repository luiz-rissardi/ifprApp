import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserFacade } from 'src/app/facades/UserFacade';
import { ValidateForm } from '../validateFormService/validateFomr-Service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends ValidateForm{

  public load: boolean = false;

  constructor(
    private userFacade: UserFacade,
    formBuilder: FormBuilder,
    dom: Renderer2,
    el: ElementRef,
  ) {

    const form = formBuilder.group({
      name: [],
      password: []
    });
    super(el,dom,form);
  }

  login() {
    const [userName, password] = ["name", "password"].map(el => this.form.get(el).value);
    if (this.isNotEmpty(userName) && this.isNotEmpty(password)) {
      this.userFacade.login(userName, password);
      this.load = true;
      setTimeout(() => {
        this.load = false;
      }, 500);
    } else {
      this.activeIvalidFeedback("name", "password");
    }
  }

  

}
