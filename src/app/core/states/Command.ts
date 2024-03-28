import { Subject } from "rxjs";
import { Injectable } from "@angular/core";

// pattern observable 
@Injectable({
    providedIn: "root"
})

export class CommandState {
    private subject: Subject<any> = new Subject<any>();
    private commandId: number;
    private show: boolean = false;

    onChangeAccount(){
        return this.subject;
    }

    setState(commandId: number, show:boolean) {
        this.commandId = commandId;
        this.show = show;
        this.notifyAll();
    }

    private notifyAll() {
        this.subject.next({ commandId:this.commandId, show:this.show });
    }
}