import { Inject, Injectable } from "@angular/core";
import { OrderService } from "../core/services/HttpRequests/Order/order.service";
import { OrderProductsService } from "../core/services/HttpRequests/OrderProduct/order-product.service";
import { Products } from "../core/models/ProductsModel";
import { Observable, switchMap } from "rxjs";
import { WarningHandlerService } from "../core/services/warningHandler/warning-handler.service";
import { Handler } from "../core/services/interfaces/warningHandler/handler";
import { LoaderSpinnerState } from "../core/states/LoaderSpinnerState";
import { ClientService } from "../core/services/HttpRequests/Client/client.service";
import { v4 as uuidv4 } from 'uuid';
import { CommandsService } from "../core/services/HttpRequests/Commands/commands.service";
import { CommandState } from "../core/states/Command";
import { ProductsService } from "../core/services/HttpRequests/Products/products.service";
import { ProductsListState } from "../core/states/ProductsListState";

@Injectable({
    providedIn: 'root'
})
export class CommerceFacade {
    constructor(
        private orderService: OrderService,
        private orderProductService: OrderProductsService,
        private clientService: ClientService,
        private spinnerState: LoaderSpinnerState,
        private commandService: CommandsService,
        private productService: ProductsService,
        private productListState: ProductsListState,
        private commandState: CommandState,
        @Inject(WarningHandlerService) private warningHandler: Handler) { }

    private handlerOperation(operation: Observable<any>, errorMessage: string) {
        operation.subscribe({
            next: (data) => {
                this.warningHandler.reportSuccess(data?.message, data?.type);
            },
            error: (error) => {
                console.log(error);
                this.warningHandler.reportError(errorMessage);
            },
            complete: () => {
                this.spinnerState.setState(false);
            }
        })
    }

    insertOrder(products: Products[], phone: string) {
        const orderId = uuidv4();
        let commandId: number;
        products = products.map(el => ({ ...el, price: Number(el.price) }));
        const observable = this.commandService.getAvaibleCommand()
            .pipe(
                switchMap((data: any) => {
                    commandId = data.command.commandId;
                    const observable = this.clientService.handlerClient(phone, orderId)
                    return observable;
                }),
                switchMap((data: any) => {
                    // se ele já existia não presisa usar a proxima comanda 
                    if (data?.alreadyExists == false) {
                        this.commandService.updateStatusCommand(commandId, false).subscribe(() => { })
                        this.commandState.setState(commandId, true)
                    }
                    return this.orderService.createOrder(data.orderId, commandId)
                }),
                switchMap((data: any) => {
                    return this.orderProductService.insertProductsIntoOrder(data.orderId, products)
                })
            )
        this.handlerOperation(observable, "não foi possivel criar a venda");
    }

    refoundOrder(orderProducts: any) {
        this.spinnerState.setState(true);
        const observable = this.productService.refoundProducts(orderProducts.quantityToRemove, orderProducts.productId)
            .pipe(
                switchMap(() => {
                    const descontPrice = (Number(orderProducts.OriginalPrice) * orderProducts.quantityToRemove) * (-1);
                    const descontQuantity = (orderProducts.quantityToRemove) * (-1);
                    this.productListState.addQuantityIntoProduct(orderProducts.productId,orderProducts.quantityToRemove)
                    return this.orderProductService.refoundOrderProducts(descontPrice,descontQuantity,orderProducts.productId,orderProducts.orderId)
                })
            )
        this.handlerOperation(observable, "não foi possivel realizar reembolso")
    }
}