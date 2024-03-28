import { ReplaySubject, Subject, map } from "rxjs";
import { Products } from "../models/ProductsModel";
import { Injectable } from "@angular/core";


// pattern observable 
@Injectable({
    providedIn: "root"
})

export class ProductsListState {

    private productList: Map<number, Products> = new Map<number, Products>();
    private subject: ReplaySubject<any> = new ReplaySubject(1);

    setProductsList(productList: Products[]) {
        this.productList.clear();
        productList.forEach(product => {
            this.productList.set(product.productId, product);
        })
        this.notifyAll();
    }

    addQuantityIntoProduct(productId: number, quantity: number){
        const product = this.productList.get(productId);
        product.quantity += quantity;
        this.putProductsIntoList(product);
    }

    addProductsIntoList(product: Products) {
        //execute
        return () => {
            const savedData = new Map<number, Products>(this.productList);
            this.productList.set(product.productId, product);
            this.notifyAll();
            //roll back
            return () => {
                this.productList = new Map<number, Products>(savedData);
                this.notifyAll();
            }
        }
    }

    putProductsIntoList(product: Products) {
        //execute
        return () => {
            const savedData = new Map<number, Products>(this.productList);
            if (this.productList.has(product.productId)) {
                this.productList.delete(product.productId);
                this.productList.set(product.productId, product);
                this.notifyAll();
            }
            //roll back
            return () => {
                this.productList = new Map<number, Products>(savedData);
                this.notifyAll();
            }

        }
    }

    deleteProductsIntoList(product: Products) {
        //execute
        return () => {
            const savedData = new Map<number, Products>(this.productList);
            this.productList.delete(product.productId);
            this.notifyAll();
            //roll back
            return () => {
                this.productList = new Map<number, Products>(savedData);
                this.notifyAll();
            }

        }
    }

    onProductsListChange() {
        return this.subject;
    }

    private notifyAll() {
        this.subject.next(this.productList);
    }
}