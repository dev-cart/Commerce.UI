import { Injectable } from '@angular/core';
import {Category} from '../models/category.model'
import { CategoryApiSrvc } from './data/category-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Category[] = [];
  constructor(private categoryApi: CategoryApiSrvc) { }

  getCategories(): Observable<Category[]> {
    return this.categoryApi.getAllCategories();
  }

  getCategoryById(id: number): Observable<Category> {
    
    return this.categoryApi.getCategoryById(id);
  }

  addCategory(category: Category) : Observable<any> {
      return this.categoryApi.addCategory(category);
  }

  updateCategory(category: Category) : Observable<any> {
      return this.categoryApi.updateCategory(category);
  }

  deleteCategory(id: number): Observable<void> {
      return this.categoryApi.deleteCategory(id);
  }

  // getCategoryById(id: number): Category | null {
  //   var category = this.categories.find(x => x.id == id);
  //   return category || null;
  // }

  // addCategory(category: Category) : void {
  //   //const newCategory = new Category(name);
  //   this.categories.push(category);
  // }

  // updateCategory(category: Category) {
    
  // }

  // deleteCategory(id: number | undefined) {
  //   throw new Error('Method not implemented.');
  // }

  // removeCategory(id: number){
  //   //this.categories.
  // }
}
