import { ElementRef, Renderer2, RendererStyleFlags2 } from '@angular/core';

export class DOMManipulation {

  constructor(
    private el: ElementRef,
    private dom: Renderer2
  ) { }

  removeClassToElement(elementId: string, className: string): void {
    const el = this.el.nativeElement.querySelector(`#${elementId}`)
    this.dom.removeClass(el, className);
  }

  addClassToElement(elementId: string, className: string): void {
    const el = this.el.nativeElement.querySelector(`#${elementId}`);
    this.dom.addClass(el, className);
  }

  elementContais(elementId: string, className: string): boolean {
    const el = this.el.nativeElement.querySelector(`#${elementId}`, true);
    const contais = el.classList.contains(className);
    return contais
  }

  removeAttribute(elementId: string, attribute: string) {
    const el = this.el.nativeElement.querySelector(`#${elementId}`, true);
    this.dom.removeAttribute(el, attribute)
  }

  setAttributeStyle(elementId: string, attribute: string, newValue: string) {
    const el = this.el.nativeElement.querySelector(`#${elementId}`, true);
    this.dom.setStyle(el, attribute, newValue, RendererStyleFlags2.Important)
  }

  findElement(elementId: string) {
    return this.el.nativeElement.querySelector(`#${elementId}`);
  }

}
