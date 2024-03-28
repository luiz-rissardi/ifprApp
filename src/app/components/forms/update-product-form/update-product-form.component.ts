import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ProductsFacade } from 'src/app/facades/ProductsFacade';
import { Products } from 'src/app/core/models/ProductsModel';
import { LoaderSpinnerState } from 'src/app/core/states/LoaderSpinnerState';
import { ProductsState } from 'src/app/core/states/ProductState';
import { ProductsListState } from 'src/app/core/states/ProductsListState';

@Component({
  selector: 'app-update-product-form',
  templateUrl: './update-product-form.component.html',
  styleUrls: ['./update-product-form.component.scss']
})
export class UpdateProductsFormComponent {

  public formProducts!: FormGroup;

  constructor(
    private Builder: FormBuilder,
    private productState: ProductsState,
    private productListState: ProductsListState,
    private spinnerState: LoaderSpinnerState,
    private productFacade: ProductsFacade) {

    this.formProducts = this.Builder.group({
      productId: [null],
      productName: [null],
      quantity: [null],
      price: [null],
      productChosen:[null]
    })

    this.productState.getStateWhenChanging()
      .subscribe((product: Products) => {
        this.formProducts.setValue({
          productName: product.productName,
          price: product.price,
          quantity: product.quantity,
          productId: product.productId,
          productChosen:product.productChosen
        })
      })
  }

  PutProducts() {
    this.spinnerState.setState(true);
    const { productName, quantity, price, productId, productChosen } = this.formProducts.value;
    const execute = this.productListState.putProductsIntoList({ productName, quantity, price, productId, active: true, productChosen })
    const rollback = execute();
    try {
      this.productFacade.updateProducts({ productName, quantity, price, productId, active: true, productChosen });
    } catch (error) {
      rollback();
    }
  }
}
