import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ProductsFacade } from 'src/app/facades/ProductsFacade';
import { LoaderSpinnerState } from 'src/app/core/states/LoaderSpinnerState';
import { ProductsListState } from 'src/app/core/states/ProductsListState';

@Component({
  selector: 'app-create-product-form',
  templateUrl: './create-product-form.component.html',
  styleUrls: ['./create-product-form.component.scss']
})
export class CreateProductsFormComponent {

  public formProducts!: FormGroup;

  constructor(
    private Builder: FormBuilder,
    private productListState: ProductsListState,
    private spinnerState: LoaderSpinnerState,
    private productFacade: ProductsFacade
  ) {
    this.formProducts = this.Builder.group({
      productId: [null],
      productName: [null],
      quantity: [null],
      price: [null]
    })
  }

  async CreateProducts() {
    this.spinnerState.setState(true);
    const { productName, quantity, price } = this.formProducts.value;
    try {
      const productId = await this.productFacade.createProducts({ productId: 1, productName, price, quantity, active: true, productChosen: false });
      const execute = this.productListState.addProductsIntoList({ productName, quantity, price, productId, active: true, productChosen: false })
      const rollback = execute();
      if (productId == undefined) rollback();
    } catch (error) {
      console.log(error);
    }
  }
}
