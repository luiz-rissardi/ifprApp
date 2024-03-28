import { Injectable } from "@angular/core"
import { Products } from "../models/ProductsModel";
import { ReplaySubject, Subject } from "rxjs"

@Injectable({
    providedIn:"root"
})
export class ProductsState {
    private subject:ReplaySubject<Products> = new ReplaySubject<Products>(2);

    public setState(product:Products):void{
        product.productChosen = product.productChosen == 0?false:true;
        this.notifyAll(product);
    }

    public getStateWhenChanging():Subject<Products>{
        return this.subject;
    }

    private notifyAll(product:Products):void{
        this.subject.next(product)
    }


}