import { Component, Inject } from '@angular/core';
import { AccountState } from 'src/app/core/states/AccountState';
import { Account } from 'src/app/core/models/AccountModel';
import jsQR from 'jsqr';
import { getProductsIdUserAnexed } from 'src/app/core/storage/sessionStorage';
import { OrderProductsFacade } from 'src/app/facades/OrderProductsFacade';
import { WarningHandlerService } from 'src/app/core/services/warningHandler/warning-handler.service';
import { Handler } from 'src/app/core/services/interfaces/warningHandler/handler';

@Component({
  selector: 'app-ticket-manager',
  templateUrl: './ticket-manager.component.html',
  styleUrls: ['./ticket-manager.component.scss']
})
export class TicketManagerComponent {

  private productId: number;
  amountToRemove: number = 0;
  product: any;


  constructor(
    private userState: AccountState,
    private orderProductsFacade: OrderProductsFacade,
    @Inject(WarningHandlerService) private warningHandler: Handler
  ) {
    this.productId = Number(getProductsIdUserAnexed());
    this.userState.onChangeAccount().subscribe((data: Account) => {
      this.productId = data.productIdAnexed;
    })
  }

  // "7b45c2b0-2a89-4518-a4e5-271b0d634de0" command Url
  scan() {
    this.startCamera()
  }

  addToRemove() {
    if (this.amountToRemove < this.product?.quantity) {
      this.amountToRemove++;
    } else {
      this.warningHandler.reportError("quantiedade máxima atingida")
    }
  }
  lessToRemove() {
    if (this.amountToRemove > 0) {
      this.amountToRemove--;
    } else {
      this.warningHandler.reportError("quantiedade minima atingida")
    }
  }

  confirmRemove() {
    this.product.quantity -= this.amountToRemove;
    this.orderProductsFacade.recordProductsOrder(this.product.orderId, this.product.productId, this.amountToRemove)
    this.amountToRemove = 0;
  }

  private startCamera() {
    const cameraView: HTMLVideoElement = document.getElementsByTagName('video')[0];
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        cameraView.srcObject = stream;
        requestAnimationFrame(this.tick(cameraView))
      })
      .catch(function (err) {
        console.error('Erro ao acessar a câmera: ', err);
      });
  }

  private tick(video: HTMLVideoElement) {
    return async () => {
      const canvasElement = document.createElement('canvas');
      canvasElement.width = 200;
      canvasElement.height = 200;
      const context = canvasElement.getContext('2d');
      context.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

      const imageData = context.getImageData(0, 0, canvasElement.width, canvasElement.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) {
        this.orderProductsFacade.getOneProductOfOrder(code.data, 12)
          .subscribe((data: any) => {
            this.product = data
          })
      }
      requestAnimationFrame(this.tick(video));
    };
  }
}
