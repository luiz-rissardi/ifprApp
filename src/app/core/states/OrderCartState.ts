import { ReplaySubject, Subject } from "rxjs";
import { Products } from "../models/ProductsModel";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class OrderCartState {

    private products: Map<number, Products> = new Map<number, Products>();
    private subject: ReplaySubject<any> = new ReplaySubject(1);

    addToCart(product: Products) {
        if (this.products.has(product.productId)) {
            this.addToOrderCart(product);
        } else {
            this.createToOrderCart(product);
        }
        this.notifyAll();
    }

    getAllProductss(){
        return Array.from(this.products.values()).flat().filter(el => !Number.isInteger(el))
    }

    removeOneToCart(product: Products) {
        const productOrder = this.products.get(product.productId);
        productOrder.quantity -= 1;
        this.products.delete(product.productId);
        this.products.set(product.productId, productOrder);
        this.notifyAll();
    }

    removeItem(product: Products) {
        this.products.delete(product.productId);
        this.notifyAll();
    }

    removeAll() {
        this.products.clear();
        this.notifyAll();
    }

    onChangeOrderCart() {
        return this.subject;
    }

    private notifyAll() {
        this.subject.next(this.products);
    }

    private addToOrderCart(product: Products) {
        const productOrder = this.products.get(product.productId);
        productOrder.quantity += 1;
        this.products.delete(product.productId);
        this.products.set(product.productId, productOrder);
    }

    private createToOrderCart(product:Products) {
        const productOrder = { ...product, quantity: 1 };
        this.products.set(product.productId, productOrder);
    }
}