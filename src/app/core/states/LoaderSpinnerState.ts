
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

// pattern observable 
@Injectable({
    providedIn: "root"
})

export class LoaderSpinnerState {
    private show: boolean = false;
    private subject: Subject<boolean> = new Subject<boolean>();

    setState(state:boolean){
        this.show = state;
        this.notifyAll();
    }

    onChangeState(){
        return this.subject;
    }

    private notifyAll(){
        this.subject.next(this.show);
    }
}