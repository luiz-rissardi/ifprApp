import { Inject, Injectable } from "@angular/core";
import { AccountService } from "../core/services/HttpRequests/User/user.service";
import { WarningHandlerService } from "../core/services/warningHandler/warning-handler.service";
import { Handler } from "../core/services/interfaces/warningHandler/handler";
import { AccountState } from "../core/states/AccountState";
import { Router } from "@angular/router";
import { setProductsIdUserAnexed, setUserNameStorage } from "../core/storage/sessionStorage";

@Injectable({
    providedIn: "root"
})

export class UserFacade {
    constructor(
        @Inject(WarningHandlerService) private warningHandler: Handler,
        private accountService: AccountService,
        private AccountState: AccountState,
        private router: Router,
    ) {

    }

    login(name: string, password: string) {
        try {
            setUserNameStorage(name);
            this.accountService.login(name, password).subscribe((data: any) => {
                let { authenticated, user } = data;
                if (authenticated === false) {
                    this.warningHandler.reportError("usuario ou senha incorretos");
                    return;
                }
                setProductsIdUserAnexed(user.productIdAnexed)
                this.AccountState.setState(user);
                const isAdmin = user.typeAccount === 1;
                if (isAdmin) {
                    this.router.navigate(["/home"]);
                }
                else {
                    this.router.navigate(["/home/manager"]);
                }

            })
        } catch (error) {
            console.log(error);
            this.warningHandler.reportError("não foi possivel realizar o login")
        }
    }

    createAccount(account: any) {
        try {
            this.accountService.createAccount(account)
                .subscribe((data: any) => {
                    let { authenticated, user } = data;
                    if (authenticated) {
                        user = user[0];
                        this.AccountState.setState(account);
                        this.router.navigate(["/home/manager"]);
                    } else {
                        this.warningHandler.reportError(data?.message)
                    }
                })
        } catch (error) {
            this.warningHandler.reportError("não foi possivel criar nova conta")
        }
    }

    updatePassword(userName: string, password: string) {
        try {
            this.accountService.updatePassword(userName, password)
                .subscribe((data: any) => {
                    this.warningHandler.reportSuccess(data?.message, data?.type);
                    if (data?.type !== "invalid") this.router.navigate(["/auth"]);
                })
        } catch (error) {
            this.warningHandler.reportError("não foi possivel atualizar a senha")
        }
    }

}