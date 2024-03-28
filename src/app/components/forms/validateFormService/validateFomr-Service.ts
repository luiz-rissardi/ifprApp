import { ElementRef, Renderer2 } from "@angular/core";
import { FormGroup } from "@angular/forms";

export class ValidateForm {

    protected invalidfeedbacks: boolean[] = [];

    constructor(
        private el: ElementRef,
        private dom: Renderer2,
        protected form: FormGroup
    ) {

    }

    protected activeIvalidFeedback(...fields: string[]) {
        fields.forEach((el, i) => {
            const element = this.el.nativeElement.querySelector(`#${el}`);
            if (!this.isNotEmpty(this.form.get(el).value)) {
                this.dom.addClass(element, "invalid-feedback-login");
                this.invalidfeedbacks[i] = true;
            }
            else {
                this.dom.removeClass(element, "invalid-feedback-login");
                this.invalidfeedbacks[i] = false;
            }
        })
    }

    protected isNotEmpty(value: null | string) {
        return String(value).trim() !== "" && value !== null;
    }

    protected resetFormLogin() {
        ["name", "password"].forEach((el, i) => {
            const element = this.el.nativeElement.querySelector(`#${el}`);
            this.dom.removeClass(element, "invalid-feedback-login");
            this.invalidfeedbacks[i] = false;
        })
    }
}