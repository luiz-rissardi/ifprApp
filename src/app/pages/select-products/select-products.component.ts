import { Component, ElementRef, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Products } from 'src/app/core/models/ProductsModel';
import { Handler } from 'src/app/core/services/interfaces/warningHandler/handler';
import { WarningHandlerService } from 'src/app/core/services/warningHandler/warning-handler.service';
import { ProductsListState } from 'src/app/core/states/ProductsListState';
import { OrderCartState } from 'src/app/core/states/OrderCartState';
import { DOMManipulation } from "src/app/shared/domManipulation/dommanipulation";


@Component({
  selector: 'app-commerce',
  templateUrl: './select-products.component.html',
  styleUrls: ['./select-products.component.scss']
})
export class SelectProductssComponent extends DOMManipulation implements OnInit,OnDestroy {

  public products: Products[] = [];

  constructor(
    @Inject(WarningHandlerService) private listenHander: Handler,
    private productsListState: ProductsListState,
    private orderCartState: OrderCartState,
    el: ElementRef,
    dom: Renderer2
  ) {
    super(el, dom);
  }
  ngOnDestroy(): void {
    this.orderCartState.removeAll();
  }

  ngOnInit(): void {
    this.productsListState.onProductsListChange().subscribe(data => {
      this.products.length = 0;
      data.forEach((product: Products) => {
        this.products.push(product)
      })
    })
  }

  selectProducts(product: Products) {
    const isSelected = this.elementContais(`product-${product.productId}`, "product-active");
    if (product.quantity > 0) {
      if (isSelected) {
        this.orderCartState.removeItem(product);
        this.removeClassToElement(`product-${product.productId}`, "product-active")
      } else {
        this.orderCartState.addToCart(product);
        this.addClassToElement(`product-${product.productId}`, 'product-active');
      }
    }else{
      this.listenHander.reportError("produto com quantiedade insuficiente");
      this.addClassToElement(`product-${product.productId}`,"productInvalid");
      setTimeout(()=>{
        this.removeClassToElement(`product-${product.productId}`,"productInvalid");
      },1500);
    }
  }

}
