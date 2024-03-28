import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/core/models/AccountModel';
import { AccountState } from 'src/app/core/states/AccountState';
import { OrderCartState } from 'src/app/core/states/OrderCartState';
import { getUserNameStorage } from 'src/app/core/storage/sessionStorage';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  public isAdminAccount: boolean = false;
  public activeOrderCart:boolean = false;

  constructor(
    private accountState: AccountState,
    private orderCartState: OrderCartState
  ) {}

  ngOnInit(): void {
    this.isAdminAccount = getUserNameStorage() == "ifpr";
    this.accountState.onChangeAccount()
      .subscribe((account: Account) => {
        this.isAdminAccount = account.typeAccount == 1 ? true : false;
      })

    this.orderCartState.onChangeOrderCart()
      .subscribe(data => {
        this.activeOrderCart = data.size > 0;
      })
  }

}
