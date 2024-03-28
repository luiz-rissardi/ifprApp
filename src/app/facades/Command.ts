import { Inject, Injectable } from "@angular/core";
import { Observable, switchMap } from "rxjs";
import { WarningHandlerService } from "../core/services/warningHandler/warning-handler.service";
import { Handler } from "../core/services/interfaces/warningHandler/handler";
import { LoaderSpinnerState } from "../core/states/LoaderSpinnerState";
import { CommandsService } from "../core/services/HttpRequests/Commands/commands.service";
import { OrderService } from "../core/services/HttpRequests/Order/order.service";
import { ClientService } from "../core/services/HttpRequests/Client/client.service";
import { CommandState } from "../core/states/Command";


@Injectable({
    providedIn: 'root'
})
export class CommandFacade {
    constructor(
        @Inject(WarningHandlerService) private warningHandler: Handler,
        private spinnerState: LoaderSpinnerState,
        private commandService: CommandsService,
        private orderService: OrderService,
        private clientService: ClientService,
        private commandState: CommandState
    ) {
    }

    private handlerOperation(operation: Observable<any>, errorMessage: string) {
        operation.subscribe({
            next: (data) => {
                this.warningHandler.reportSuccess(data?.message, data?.type);
            },
            error: (error) => {
                this.spinnerState.setState(false);
                this.warningHandler.reportError(errorMessage);
            },
            complete: () => {
                this.spinnerState.setState(false);
            }
        })
    }

    resetCommand(commandId: number) {
        this.spinnerState.setState(true);
        const observable = this.orderService.inactiveOrder(commandId).pipe(
            switchMap(() => this.commandService.updateStatusCommand(commandId, true))
        );
        this.handlerOperation(observable, "não foi possível resetar comanda")
    }

    inactiveCommand(phone: string) {
        this.spinnerState.setState(true);
        let newCommandId:number
        const observable = this.commandService.getAvaibleCommand().pipe(
            switchMap((data: any) => {
                newCommandId = data?.command?.commandId;
                return this.clientService.getClient(phone)
            }),

            switchMap((data: any) => {
                return this.orderService.putCommandIntoOrder(data.orderId,newCommandId)
            }),

            switchMap((data: any)=> {
                this.commandService.updateStatusCommand(newCommandId, false).subscribe(() => { })
                this.commandState.setState(newCommandId,true);
                return this.commandService.inactiveCommand(data.oldCommandId)
            })
        )
        this.handlerOperation(observable,"numero de telefone não encontardo");

    }
}