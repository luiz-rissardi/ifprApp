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
  productsSelling: TopProductssSelling[] = [];
  productsBetweenDateLabes: string[] = [];
  productsBetweenDateTotalPrices: number[] = [];
  totalPriceOfOrders: number;


  constructor(formBuilder: FormBuilder, private orderProductFacade: OrderProductsFacade) {
    this.form = formBuilder.group({
      qualification: [],
      initialDate: [],
      endDate: []
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

  async getProductsBetweenDate() {
    const initialDate = this.form.get("initialDate").value;
    const endDate = this.form.get("endDate").value;
    const data = this.orderProductFacade.getProductsOrderBetweenDate(this.DateFormat(initialDate), this.DateFormat(endDate))
      data.subscribe((data: any[]) => {
        data.forEach((el: any,i) => {
          this.productsBetweenDateLabes.push(el.productName)
          this.productsBetweenDateTotalPrices.push(el.totalPrice)
        })
      })
  }

  getTopProducts() {
    const rank = this.form.get("qualification").value;
    this.orderProductFacade.getTopProducts(rank)
  }

  private DateFormat(date: string) {
    const parsedDate = new Date(date);
    return parsedDate.toISOString()
      .replace("T", " ")
      .replace(/.\w{4}$/, "")
  }
}

