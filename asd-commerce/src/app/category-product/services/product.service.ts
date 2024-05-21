import { Injectable } from '@angular/core';
import {Product} from '../models/product.model'
import { Observable } from 'rxjs';
import { ProductApiSrvc } from './data/product-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private categories: Product[] = [];
  constructor(private productApi: ProductApiSrvc) { }

  getProducts(): Observable<Product[]> {
    return this.productApi.getAllProducts();
  }

  getProductById(id: number): Observable<Product> {
    
    return this.productApi.getProductById(id);
  }

  addProduct(product: Product) : Observable<any> {
      return this.productApi.addProduct(product);
  }

  updateProduct(product: Product) : Observable<any> {
      return this.productApi.updateProduct(product);
  }

  deleteProduct(id: number): Observable<void> {
      return this.productApi.deleteProduct(id);
  }
}
