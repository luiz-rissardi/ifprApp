
import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";

// pattern observable 
@Injectable({
    providedIn: "root"
})

export class LoaderSpinnerState {
    private show: boolean = false;
    private subject: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

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