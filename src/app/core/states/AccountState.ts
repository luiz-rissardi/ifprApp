import { ReplaySubject } from "rxjs";
import { Injectable } from "@angular/core";
import { Account } from "../models/AccountModel";

// pattern observable 
@Injectable({
    providedIn: "root"
})

export class AccountState {
    private account: Account;
    private subject: ReplaySubject<Account > = new ReplaySubject<Account >(1);

    onChangeAccount(){
        return this.subject;
    }

    setState(acconut: Account ) {
        this.account = acconut;
        this.notifyAll();
    }

    private notifyAll() {
        this.subject.next(this.account);
    }
}