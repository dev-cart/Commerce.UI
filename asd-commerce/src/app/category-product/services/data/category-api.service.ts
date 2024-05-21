import { HttpClient } from '@angular/common/http'
import {Injectable} from '@angular/core'
import { Observable } from 'rxjs'
import { Category } from '../../models/category.model'

@Injectable(
    {providedIn: 'root'}
)

export class CategoryApiSrvc {
    private apiBaseUrl = 'https://localhost:7291/api'
    private categoryApi = '/category'
    private productApi = "/product"

    constructor(private http: HttpClient){}

    getAllCategories() : Observable<Category[]> {
        return this.http.get<Category[]>(this.apiBaseUrl+this.categoryApi);
    }

    getCategoryById(id: number): Observable<Category> {
        const url = `${this.apiBaseUrl}${this.categoryApi}/${id}`;
        return this.http.get<Category>(url);
    }

    addCategory(category: Category) : Observable<any> {
        const url = `${this.apiBaseUrl}${this.categoryApi}`;
        return this.http.post<Category>(url, category)
    }

    updateCategory(category: Category) : Observable<any> {
        const url = `${this.apiBaseUrl}${this.categoryApi}/${category.id}`;
        return this.http.put<Category>(url, category);
    }

    deleteCategory(id: number): Observable<void> {
        const url = `${this.apiBaseUrl}${this.categoryApi}/${id}`;
        return this.http.delete<void>(url);
    }
}