import { Component, Renderer2, ElementRef, OnInit, Inject } from '@angular/core';
import { Products } from 'src/app/core/models/ProductsModel';
import { Handler } from 'src/app/core/services/interfaces/warningHandler/handler';
import { WarningHandlerService } from 'src/app/core/services/warningHandler/warning-handler.service';
import { LoaderSpinnerState } from 'src/app/core/states/LoaderSpinnerState';
import { ProductsListState } from 'src/app/core/states/ProductsListState';
import { OrderCartState } from 'src/app/core/states/OrderCartState';
import { CommerceFacade } from 'src/app/facades/CommerceFacade';
import { ProductsFacade } from 'src/app/facades/ProductsFacade';
import { DOMManipulation } from 'src/app/shared/domManipulation/dommanipulation';

@Component({
  selector: 'app-Order-cart',
  templateUrl: './order-cart.component.html',
  styleUrls: ['./order-cart.component.scss']
})
export class OrderCartComponent extends DOMManipulation implements OnInit {

  productsOfOrderCart: Map<number, Products> = new Map();
  private products: Map<number, Products> = new Map();
  totalPrice: number = 0;


  constructor(
    @Inject(WarningHandlerService) private listenHander: Handler,
    private OrderCartState: OrderCartState,
    private productsListState: ProductsListState,
    private productFacade: ProductsFacade,
    private commerceFacade: CommerceFacade,
    private spinnerState: LoaderSpinnerState,
    dom: Renderer2,
    el: ElementRef) {
    super(el, dom);
  }

  ngOnInit(): void {
    this.OrderCartState.onChangeOrderCart()
      .subscribe(data => {
        this.openOrderCart();
        this.setOrderCart(data);
        this.totalPrice = 0;
        this.mapEntries(data).forEach(el => {
          this.totalPrice += Number(el.quantity) * Number(el.price)
        })
      })

    this.productsListState.onProductsListChange().subscribe(data => {
      this.products.clear();
      data.forEach((product: Products) => {
        this.products.set(product.productId, product)
      })
    })
  }

  mapEntries(arr: Map<number, Products>): Products[] {
    return Array.from(arr.values())
  }

  isProducts(item: any): item is Products {
    return item instanceof Object && 'active' in item;
  }

  addOneItem(product: Products) {
    if (this.checkQuantityForOrder(product)) {
      this.OrderCartState.addToCart(product);
    } else {
      this.listenHander.reportError("produto com quantiedade insuficiente");
      this.addClassToElement(`product-${product.productId}`, "productInvalid");
      setTimeout(() => {
        this.removeClassToElement(`product-${product.productId}`, "productInvalid");
      }, 1500);
    }
  }

  removeOneItem(product: Products) {
    this.OrderCartState.removeOneToCart(product);
    if (product.quantity < 0) {
      this.OrderCartState.removeItem(product);
      this.productsOfOrderCart.delete(product.productId);
      document.getElementById(`product-${product.productId}`).classList.remove("product-active");
    }
  }

  cancel() {
    try {
      this.removeAllItensOfOrderCart();
      this.closeOrderCart();
      this.listenHander.reportSuccess("venda cancelada", "valid")
    } catch (error) {
      this.listenHander.reportError("não foi possivel remover os produtos");
    }
  }

  async confirmOrder() {
    try {
      const phone: string = this.findElement("phone").value;
      if ((phone == undefined || phone.length < 10) || Number.isNaN(Number(phone))) {
        this.listenHander.reportError("telefone inválido");
        return;
      }
      this.spinnerState.setState(true);
      let productsOsOrderCart = this.OrderCartState.getAllProductss();
      productsOsOrderCart = productsOsOrderCart.map(el => ({ ...el, active: el.active ? true : false, productChosen: el.productChosen ? true : false }));
      this.commerceFacade.insertOrder(productsOsOrderCart, phone);
      this.productFacade.SubstractItem(this.mapEntries(this.products), productsOsOrderCart);
      this.removeAllItensOfOrderCart();
      this.closeOrderCart();
    } catch (error) {
      this.listenHander.reportError("não foi possive realizar venda");
    }
  }

  closeOrderCart() {
    this.removeClassToElement("backgroundCurtain", "showBackgroundCurtain");
    this.removeClassToElement("OrderCart", "show");
    this.addClassToElement("OrderCart", "hidden");
    setTimeout(() => {
      this.setAttributeStyle("OrderCart", "display", "none");
    }, 1000);
  }

  openOrderCart() {
    this.addClassToElement("backgroundCurtain", "showBackgroundCurtain");
    this.setAttributeStyle("OrderCart", "display", "block");
    this.removeClassToElement("OrderCart", "hidden");
    this.addClassToElement("OrderCart", "show");
  }

  private removeAllItensOfOrderCart() {
    this.productsOfOrderCart.forEach(product => {
      this.OrderCartState.removeItem(product);
      document.getElementById(`product-${product.productId}`).classList.remove('product-active')
    })
  }


  private setOrderCart(data: Map<number, Products>) {
    this.productsOfOrderCart = new Map([...data]);
    if (this.productsOfOrderCart.size - 1 < 0) {
      this.closeOrderCart();
    } else {
      this.openOrderCart();
    }
  }

  private checkQuantityForOrder(product: Products): boolean {
    const productOfListQtde = this.products.get(product.productId).quantity;
    const productOfShoopingCart = this.productsOfOrderCart.get(product.productId).quantity;
    return productOfListQtde - productOfShoopingCart > 0
  }

}
