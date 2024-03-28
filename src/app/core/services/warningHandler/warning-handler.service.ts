import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Listen } from '../interfaces/warningHandler/listen';
import { Handler } from '../interfaces/warningHandler/handler';

@Injectable({
  providedIn: 'root'
})
export class WarningHandlerService implements Handler, Listen {

  private subject: Subject<string> = new Subject();

  constructor() { }

  reportError(message: string): void {
    this.SendMessage(message,"invalid")
  }

  reportSuccess(message: string,type:string): void {
    this.SendMessage(message,type)
  }

  listenFeedBack(): Subject<string> {
    return this.subject
  }

  private SendMessage(message:string,typeFeedback:string){
    const stringify = JSON.stringify({
      message,
      typeFeedback
    })
    this.subject.next(stringify)
  }
}
