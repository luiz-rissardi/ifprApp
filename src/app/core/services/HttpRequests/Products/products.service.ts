import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products } from 'src/app/core/models/ProductsModel';
import { ProductsException } from 'src/app/core/exceptions/ProductsExceptions';
import { ServiceBase } from '../shared/serviceBase';



@Injectable({
  providedIn: 'root'
})
export class ProductsService extends ServiceBase {

  constructor(http: HttpClient) {
    super(http)
  }

  createProducts(product: Products) {
    try {
      return this.http.post(this.uri + "/product", product, this.options);
    } catch (error: any) {
      throw new ProductsException(`não foi possível criar um novo produto => ${error.message}`)
    }
  }

  substractionProducts(updates: any) {
    try {
      return this.http.post(this.uri + "/product/substraction", { updates }, this.options);
    } catch (error) {
      throw new ProductsException("não foi possivel subtrair do estoque");
    }
  }

  getAllProducts() {
    try {
      return this.http.get(this.uri + "/product");
    } catch (error: any) {
      throw new ProductsException(`não foi possivel buscar todos os produtos => ${error.message}`)
    }
  }

  refoundProducts(quantity: number, productId: string) {
    try {
      const body = {
        quantity, 
        productId
      }
      return this.http.patch(this.uri + "/product",body,this.options);
    } catch (error) {
      throw new ProductsException(`não foi possivel atualizar o usuário => ${error.message}`)

    }
  }

  updateProducts(product: Products) {
    try {
      const body = { productId: product.productId, product }
      return this.http.put(this.uri + "/product", body, this.options);
    } catch (error: any) {
      throw new ProductsException(`não foi possivel atualizar o produto => ${error.message}`)
    }
  }
}
