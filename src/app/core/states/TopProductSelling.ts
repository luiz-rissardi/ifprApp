import { ReplaySubject } from "rxjs";
import { Injectable } from "@angular/core";
import { TopProductssSelling } from "../models/TopProductSelling";


// pattern observable 
@Injectable({
    providedIn: "root"
})

export class TopProductsSellingState {

    private topProductss: TopProductssSelling[]
    private subject: ReplaySubject<TopProductssSelling[]> = new ReplaySubject(1);

    setTopProductss(productOrder: TopProductssSelling[]) {
        this.topProductss = productOrder;
        this.notifyAll();
    }


    onProductsListChange() {
        return this.subject;
    }

    private notifyAll() {
        this.subject.next(this.topProductss);
    }
}