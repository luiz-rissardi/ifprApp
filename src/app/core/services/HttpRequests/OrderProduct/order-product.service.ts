import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products } from 'src/app/core/models/ProductsModel';
import { OrderProductsException } from 'src/app/core/exceptions/OrderProductException';
import { ServiceBase } from '../shared/serviceBase';

@Injectable({
  providedIn: 'root'
})
export class OrderProductsService extends ServiceBase {

  constructor(http: HttpClient) {
    super(http)
  }

  insertProductsIntoOrder(orderId: string, products: Products[]) {
    try {
      const body = { orderId, products };
      return this.http.post(this.uri + "/order/products", body, this.options);
    } catch (error) {
      throw new OrderProductsException("não foi possivel inserir os produtos na venda");
    }
  }

  getProductOfOrder(orderId: string, productId: number) {
    try {
      return this.http.get(this.uri + `/order/product/${orderId}&${productId}`, this.options);
    } catch (error) {
      throw new OrderProductsException("não foi possivel pegar o produto da venda");
    }
  }

  getAllProductsOfOrder(orderId: string) {
    try {
      return this.http.get(this.uri + `/order/products/${orderId}`, this.options);
    } catch (error) {
      throw new OrderProductsException("não foi possivel pegar os produtos da venda");
    }
  }

  refoundOrderProducts(descontPrice: number, descontQuantity: number, productId: number, orderId: string) {
    try {
      const body = {
        descontPrice,
        descontQuantity,
        productId,
        orderId
      }
      return this.http.patch(this.uri + `/order/products`, body, this.options);
    } catch (error) {
      throw new OrderProductsException("não foi possivel realizar reembolso dos produtos");
    }
  }

  lessProductsQuantityOfOrder(orderId: string, productId: number, quantity: number) {
    try {
      const body = { orderId, productId, quantity };
      return this.http.put(this.uri + "/order/products", body, this.options);
    } catch (error) {
      throw new OrderProductsException("não foi possivel realizar baixa");
    }
  }

  getTopSellingProducts(rank: string) {
    try {
      return this.http.get(this.uri + `/order/product/top/${rank}`, this.options);
    } catch (error) {
      console.log(error);
      throw new OrderProductsException("não foi possivel pegar top produtos vendidos");
    }
  }

}
