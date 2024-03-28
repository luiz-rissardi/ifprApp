import { Component, OnInit } from '@angular/core';
import { ProductsFacade } from './facades/ProductsFacade';
import { ProductsListState } from './core/states/ProductsListState';
import { LoaderSpinnerState } from './core/states/LoaderSpinnerState';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Project';

  //get data of database
  constructor(
    private productsFacade: ProductsFacade,
    private productListState: ProductsListState,
    private spinnerState: LoaderSpinnerState
  ) {
  }

  ngOnInit(): void {
    this.spinnerState.setState(true);
    this.productsFacade.findAllProductss().subscribe(data => {
      this.productListState.setProductsList(data);
    })
  }
  
}
