import { Component } from '@angular/core';
import { Account } from 'src/app/core/models/AccountModel';
import { AccountState } from 'src/app/core/states/AccountState';
import { getUserNameStorage } from 'src/app/core/storage/sessionStorage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public userName:string;

  constructor(private accountState:AccountState) {
    this.userName = getUserNameStorage()
    this.accountState.onChangeAccount().subscribe((account:Account)=>{
      this.userName = account.userName
    })
  }
}
