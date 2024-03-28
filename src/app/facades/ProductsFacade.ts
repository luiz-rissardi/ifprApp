import { Injectable, Inject } from '@angular/core';
import { ProductsService } from '../core/services/HttpRequests/Products/products.service';
import { Products } from '../core/models/ProductsModel';
import { WarningHandlerService } from '../core/services/warningHandler/warning-handler.service';
import { Handler } from '../core/services/interfaces/warningHandler/handler';
import { Observable } from 'rxjs';
import { LoaderSpinnerState } from '../core/states/LoaderSpinnerState';
import { ProductsListState } from '../core/states/ProductsListState';


@Injectable({
    providedIn: 'root'
})

export class ProductsFacade {
    constructor(
        private service: ProductsService,
        private productsListState: ProductsListState,
        private spinnerState: LoaderSpinnerState,
        @Inject(WarningHandlerService) private warningHandler: Handler
    ) {

    }

    private handleOperation(operation: Observable<any>, errorMessage: string) {
        operation.subscribe({
            next: (data: any) => {
                this.warningHandler.reportSuccess(data?.message, data?.type);
            },
            error: (error) => {
                console.log(error);
                this.warningHandler.reportError(errorMessage);
            },
            complete: () => {
                this.spinnerState.setState(false);
            }
        });
    }

    createProducts(product: Products): Promise<number> {
        return new Promise((resolve, reject) => {
            try {
                this.service.createProducts(product).subscribe({
                    next: (data: any) => {
                        this.warningHandler.reportSuccess(data.message, data.type);
                        resolve(data.productId);
                    },
                    error: (error) => {
                        console.log(error);
                        this.warningHandler.reportError("Não foi possível criar o produto!");
                    },
                    complete: () => {
                        this.spinnerState.setState(false);
                    },
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    updateProducts(product: Products) {
        this.handleOperation(
            this.service.updateProducts(product),
            "Não foi possível atualizar o produto!"
        )
    }

    inactiveProducts(product: Products) {
        product.active = false;

        this.handleOperation(
            this.service.updateProducts(product),
            "Não foi possível inativar o produto!"
        )
    }

    findAllProductss(): Observable<any> {
        return new Observable(subscriber => {
            this.service.getAllProducts().subscribe({
                next: (data: any) => {
                    subscriber.next(data)
                },
                error: (error) => {
                    subscriber.error("invalid")
                    this.warningHandler.reportError("Não foi possível pegar os produtos!");
                },
                complete: () => {
                    this.spinnerState.setState(false);
                }
            })
        })
    }

    SubstractItem(products: Products[], productsOfOrderCart: Products[]) {
        const { substractsMapped, updates } = this.mapSubstraction(productsOfOrderCart, products);
        this.substractionOfProducts(updates);
        this.productsListState.setProductsList(substractsMapped);
    }

    private substractionOfProducts(updates: any) {
        this.handleOperation(
            this.service.substractionProducts(updates),
            "não foi possivel substrair do estoque"
        )
    }

    private mapSubstraction(productsOfOrderCart: Products[], products: Products[]) {
        const updates = productsOfOrderCart.map(el => ({ productId: el.productId, quantity: el.quantity }));

        const map = products.map(el => {
            let obj = el;
            for (const update of updates) {
                if (el?.productId === update?.productId) {
                    obj = { ...el, quantity: el.quantity - update.quantity };
                }
            }
            return obj;
        })
        return {
            substractsMapped: map,
            updates
        }
    }

}