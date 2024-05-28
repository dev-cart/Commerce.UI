import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../services/category.service';
import { Product } from '../../../models/product.model';
import { FormsModule } from '@angular/forms';
import { AddCategoryComponent } from '../../add/add-category/add-category.component';
import { EditCategoryComponent } from '../../edit/edit-category/edit-category.component';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from "../../product/add/add-product/add-product.component";
import { ProductComponent } from "../../product/product.component";
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Subscription } from 'rxjs';
import { SharedService } from '../../../../shared/shared.service';

@Component({
    selector: 'app-category-list',
    standalone: true,
    templateUrl: './category-list.component.html',
    styleUrl: './category-list.component.scss',
    imports: [FormsModule, CommonModule, AddCategoryComponent, 
      EditCategoryComponent, AddProductComponent, ProductComponent, RouterModule]
})
export class CategoryListComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  products: Product[] = [];
  editingCategory: Category | null = {} as Category;
  private subscription!: Subscription;

  constructor(private categorySrvc: CategoryService,
    private productSrvc: ProductService,
    private router: Router,
    private sharedSrvc: SharedService
  ) {
    
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async ngOnInit(): Promise<void> {
    await this.loadProducts();
    await this.loadCategories();

    this.subscription = this.sharedSrvc.reloadCatgrs$.subscribe(reload => {
      this.loadProducts();
     // this.loadCategories();
    })
  }

  async loadCategories(): Promise<void> {
     this.categorySrvc.getCategories().subscribe(ctgrs => {
      this.categories = ctgrs;
      if(this.products && this.products.length > 0) {
        this.categories.forEach(catgry => {
          catgry.products = this.products.filter(p => p.categoryId === catgry.id);
      });
    }
    })
  }

  async loadProducts(): Promise<void> {
     this.productSrvc.getProducts().subscribe(prdcts => {
      this.products = prdcts;
      if(prdcts && prdcts.length > 0 && this.categories && this.categories.length) {
          this.categories.forEach(catgry => {
            catgry.products = this.products.filter(p => p.categoryId === catgry.id);
        });
      }
    })
  }

  editCategoryNav(category: Category): void {  // Navigate to edit categories.
    this.router.navigate(['/categories', 'edit', category.id], 
      {state: { category: category } });
  }

  addProductNav(categoryId: any, categories: Category[]) {
    this.router.navigate(['/products', 'add', categoryId], 
      {state: { categories: categories } });
  }
  
  deleteCategory(id: number | undefined): void {
    if(id == undefined) return;
    const category = this.categories.find(c => c.id === id);
    if(!category) return;
    if(category.products && category.products.length > 0) {
      alert('Cannot delete category because it has associated products.');
      return;
    }
    this.categorySrvc.deleteCategory(id).subscribe(() => {
      this.loadCategories();
     // this.loadProducts();
      //// this.categories = this.categories.filter(ctgry => ctgry.id !== id);
      //// this.products = this.products.filter(p => p.categoryId !== id); //
    });
  }

  
}
