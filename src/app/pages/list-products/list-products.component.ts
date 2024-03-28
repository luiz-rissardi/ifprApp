import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/core/models/ProductsModel';
import { Router } from '@angular/router';
import { ProductsState } from 'src/app/core/states/ProductState';
import { ProductsFacade } from 'src/app/facades/ProductsFacade';
import { ProductsListState } from 'src/app/core/states/ProductsListState';
import { LoaderSpinnerState } from 'src/app/core/states/LoaderSpinnerState';


@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})

export class ListProductssComponent implements OnInit {

  public windowWidth: number = window.innerWidth;
  public productChosen!: Products;
  public products: Products[] = [];
  public modalIsOpen: boolean = window.innerWidth <= 765 ? true : false;

  constructor(
    private router: Router,
    private spinnerState:LoaderSpinnerState,
    private productState: ProductsState, 
    private productsListState: ProductsListState,
    private productFacade:ProductsFacade) {
  }

  ngOnInit(): void {
    this.productsListState.onProductsListChange().subscribe(data => {
      this.products.length = 0;
      data.forEach((product:Products) =>{
        this.products.push(product);
      })
    })
  }

  chosenProducts(product: Products) {
    this.productChosen = product;
  }

  updateProducts(product: Products) {
    this.productState.setState(product)
    this.router.navigate(["/home/update-products/"])
  }

  inactiveProducts(product:Products){
    this.spinnerState.setState(true);
    const execute = this.productsListState.deleteProductsIntoList(product);
    const rollback = execute();
    try {
      product.productChosen = product.productChosen == 0?false:true;
      this.productFacade.inactiveProducts(product);
    } catch (error) {
      rollback();
    }
  }

}
