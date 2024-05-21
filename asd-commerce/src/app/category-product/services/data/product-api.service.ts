import { HttpClient } from '@angular/common/http'
import {Injectable} from '@angular/core'
import { Observable } from 'rxjs'
import { Product } from '../../models/product.model'

@Injectable(
    {providedIn: 'root'}
)

export class ProductApiSrvc {
    private apiBaseUrl = 'https://localhost:7291/api'
    private productApi = "/product"

    constructor(private http: HttpClient){}

    getAllProducts() : Observable<Product[]> {
        return this.http.get<Product[]>(this.apiBaseUrl+this.productApi);
    }

    getProductById(id: number): Observable<Product> {
        const url = `${this.apiBaseUrl}${this.productApi}/${id}`;
        return this.http.get<Product>(url);
    }

    addProduct(product: Product) : Observable<any> {
        const url = `${this.apiBaseUrl}${this.productApi}`;
        return this.http.post<Product>(url, product)
    }

    updateProduct(product: Product) : Observable<any> {
        const url = `${this.apiBaseUrl}${this.productApi}/${product.id}`;
        return this.http.put<Product>(url, product);
    }

    deleteProduct(id: number): Observable<void> {
        const url = `${this.apiBaseUrl}${this.productApi}/${id}`;
        return this.http.delete<void>(url);
    }
}