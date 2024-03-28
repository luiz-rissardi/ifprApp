import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Handler } from 'src/app/core/services/interfaces/warningHandler/handler';
import { WarningHandlerService } from 'src/app/core/services/warningHandler/warning-handler.service';
import { CommerceFacade } from 'src/app/facades/CommerceFacade';
import { OrderProductsFacade } from 'src/app/facades/OrderProductsFacade';

@Component({
  selector: 'app-refound',
  templateUrl: './refound.component.html',
  styleUrls: ['./refound.component.scss']
})
export class RefoundComponent {

  phoneControl: FormControl;
  productsOrder: any[] = [];

  constructor(
    formBuilder: FormBuilder,
    @Inject(WarningHandlerService) private warningHandlerService: Handler,
    private orderProductsFacade: OrderProductsFacade,
    private commerceFacade: CommerceFacade
  ) {
    this.phoneControl = formBuilder.control([]);
  }

  refound(item: any) {
    if(item.quantity > 0){
      this.commerceFacade.refoundOrder(item)
    }
    item.quantity = item.quantity - item.quantityToRemove
  }

  refoundAll() {
    this.productsOrder.forEach(item => {
      item.quantityToRemove = item.quantity
      if (item.quantity > 0) {
        this.commerceFacade.refoundOrder(item)
      }
      item.quantity = item.quantity - item.quantityToRemove
    })
  }

  confirm() {
    const phoneNumber: string = this.phoneControl.value;
    if (phoneNumber.length > 10 && !Number.isNaN(Number(phoneNumber))) {
      this.orderProductsFacade.getOrderProductsOfClient(phoneNumber).subscribe((data: any) => {
        this.productsOrder = data?.map((el: any) => ({ ...el, quantityToRemove: 0 }))
      })
    } else {
      this.warningHandlerService.reportError("numero de telefone inválido");
    }
  }

  addToRemove(item: any) {
    if (item.quantityToRemove < item.quantity) {
      item.quantityToRemove++;
    } else {
      this.warningHandlerService.reportError("quantiedade máxima atingida")
    }
  }

  lessToRemove(item: any) {
    if (item.quantityToRemove > 0) {
      item.quantityToRemove--;
    } else {
      this.warningHandlerService.reportError("quantiedade mínima atingida")
    }
  }
}
