import { Inject, Injectable } from "@angular/core";
import { OrderProductsService } from "../core/services/HttpRequests/OrderProduct/order-product.service";
import { Observable, forkJoin, from, merge, mergeMap, subscribeOn, switchMap } from "rxjs";
import { WarningHandlerService } from "../core/services/warningHandler/warning-handler.service";
import { Handler } from "../core/services/interfaces/warningHandler/handler";
import { LoaderSpinnerState } from "../core/states/LoaderSpinnerState";
import { ClientService } from "../core/services/HttpRequests/Client/client.service";
import { TopProductsSellingState } from "../core/states/TopProductSelling";
import { TopProductssSelling } from "../core/models/TopProductSelling";
import { CommandsService } from "../core/services/HttpRequests/Commands/commands.service";
import { OrderService } from "../core/services/HttpRequests/Order/order.service";

@Injectable({
    providedIn: 'root'
})
export class OrderProductsFacade {
    constructor(
        private orderProductService: OrderProductsService,
        private clientService: ClientService,
        private commandService: CommandsService,
        private orderService: OrderService,
        private spinnerState: LoaderSpinnerState,
        private topProductsState: TopProductsSellingState,
        @Inject(WarningHandlerService) private warningHandler: Handler) { }

    private handlerOperation(operation: Observable<any>, errorMessage: string) {
        operation.subscribe({
            next: (data) => {
                this.warningHandler.reportSuccess(data?.message, data?.type);
                this.spinnerState.setState(false);
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

    getOrderProductsOfClient(phone: string) {
        this.spinnerState.setState(true);
        const observable = this.clientService.getClient(phone).pipe(
            switchMap((data: any) => {
                if (data?.type != "invalid") {
                    return this.orderProductService.getAllProductsOfOrder(data.orderId)
                }
                return new Observable(subscriber => {
                    subscriber.next(data)
                })
            })
        )

        this.handlerOperation(observable, "telefone não existe")
        return observable
    }

    recordProductsOrder(orderId: string, productId: number, quantity: number) {
        this.spinnerState.setState(true);
        const observable = this.orderProductService.lessProductsQuantityOfOrder(orderId, productId, quantity);
        this.handlerOperation(observable, "não foi possivel realizar baixa");
    }

    getTopProducts(rank: string) {
        const observable = this.orderProductService.getTopSellingProducts(rank);
        observable.subscribe((data: TopProductssSelling[]) => {
            this.topProductsState.setTopProductss(data)
        })
        this.handlerOperation(observable, "não foi possivel pegar a qualificação");
        return observable;
    }

    getOneProductOfOrder(commandUrl: string, productId: number) {
        const observable = this.commandService.getCommandByUrl(commandUrl)
            .pipe(
                switchMap((data: any) => this.orderService.getOrderByCommandId(data.commandId)),
                switchMap((data: any) => this.orderProductService.getProductOfOrder(data.orderId, productId))
            )
        this.handlerOperation(observable, "erro ao pegar produtos da comanda");
        return observable;
    }

    getProductsOrderBetweenDate(initialDate: string, endDate: string) {
        const products = new Map();
        return this.orderService.getBetweenDate(initialDate, endDate)
            .pipe(
                switchMap((orders: any) => {
                    const requests = orders.map((order: any) => this.orderProductService.getAllProductsOfOrder(order?.orderId))
                    return forkJoin(requests)
                }),
                switchMap((orders: any) => {
                    orders.map((order: any) => {
                        order.forEach((orderProduct: any) => {
                            if (products.has(orderProduct.productId)) {
                                let data = products.get(orderProduct.productId);
                                data.totalPrice += Number(orderProduct.totalPrice);
                                products.set(data.productId, data);
                            } else {
                                orderProduct.totalPrice = Number(orderProduct.totalPrice)
                                products.set(orderProduct.productId, orderProduct);
                            }
                        })
                    })
                    return new Observable(subscriber => subscriber.next([...products.values()]))
                })
            )
    }


}