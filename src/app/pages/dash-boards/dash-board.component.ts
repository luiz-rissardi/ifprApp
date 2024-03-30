import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TopProductssSelling } from 'src/app/core/models/TopProductSelling';
import { OrderProductsFacade } from 'src/app/facades/OrderProductsFacade';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})

export class DashBoardComponent {

  form: FormGroup;
  productsSelling: TopProductssSelling[] = []
  totalPriceOfOrders: number;


  constructor(formBuilder: FormBuilder, private orderProductFacade: OrderProductsFacade) {
    this.form = formBuilder.group({
      qualification: []
    })

    this.orderProductFacade.getTopProducts("").subscribe((data: TopProductssSelling[]) => {
      this.productsSelling = data
      this.totalPriceOfOrders = data.reduce((acc, el) => {
        acc += Number(el.totalPrice)
        return acc
      }, 0)

      this.orderProductFacade.getTopProducts("5")
    })
  }

  getTopProducts() {
    const rank = this.form.get("qualification").value;
    this.orderProductFacade.getTopProducts(rank)
  }
}

