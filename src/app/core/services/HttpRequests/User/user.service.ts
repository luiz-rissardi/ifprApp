import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserException } from 'src/app/core/exceptions/UserException';
import { ServiceBase } from '../shared/serviceBase';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends ServiceBase {

  constructor(http: HttpClient) {
    super(http)
  }

  login(userName: string, password: string) {
    try {
      const body = {
        userName, password
      };

      return this.http.post(this.uri + "/auth", body, this.options);
    } catch (error) {
      throw new UserException("não foi possivel realizar o login")
    }
  }

  createAccount(account: any) {
    try {
      const body = {
        userName: account.userName,
        password: account.password,
        productIdAnexed: account.productIdAnexed
      }

      return this.http.post(this.uri + "/user", body, this.options);
    } catch (error) {
      throw new UserException("não foi possivel criar nova conta")
    }
  }

  updatePassword(userName: string, password: string) {
    try {
      const body = {
        userName, password
      }

      return this.http.put(this.uri + "/user/password", body, this.options);
    } catch (error) {
      throw new UserException("não foi possivel mudar a senha")
    }
  }

}
