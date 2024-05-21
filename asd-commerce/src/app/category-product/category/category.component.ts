import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';
import { NgModel, NgForm, FormsModule } from '@angular/forms';
import { EditCategoryComponent } from "./edit/edit-category/edit-category.component";
import { CategoryListComponent } from './list/category-list/category-list.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-category',
    standalone: true,
    templateUrl: './category.component.html',
    styleUrl: './category.component.scss',
    imports: [CommonModule, FormsModule, RouterOutlet, EditCategoryComponent, CategoryListComponent]
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];
  products: Product[] = [];
  newCategory: Category = {products: [], id: 0, name:undefined};
  newProduct: Product = {description:undefined, name: undefined, price: undefined, id: 0, categoryId: 0};
  selectedCategoryId: number | undefined = 0;
  //editingCategory: Category | null = {} as Category;
  editingCategory: Category = {products:[], name: '', id: 0} as Category;
   
  constructor(private categorySrvc: CategoryService,
    private productSrvc: ProductService,
    private router: Router
  ) {}

  navigateToAddCategory() {
    this.router.navigate(['/categories', 'add'],)
      //{state: { category: category } });
  }

  async ngOnInit(): Promise<void> {
    // await this.loadProducts();
    // await this.loadCategories();
  }

  // async loadCategories(): Promise<void> {
  //    this.categorySrvc.getCategories().subscribe(ctgrs => {
  //     this.categories = ctgrs;
  //     if(this.products && this.products.length > 0) {
  //       this.categories.forEach(catgry => {
  //         catgry.products = this.products.filter(p => p.categoryId === catgry.id);
  //     });
  //   }
  //   })
  // }

  // async loadProducts(): Promise<void> {
  //    this.productSrvc.getProducts().subscribe(prdcts => {
  //     this.products = prdcts;
  //     if(prdcts && prdcts.length > 0 && this.categories && this.categories.length) {
  //         this.categories.forEach(catgry => {
  //           catgry.products = this.products.filter(p => p.categoryId === catgry.id);
  //       });
  //     }
  //   })
  // }

  // addCategory(): void {
  //   if(this.newCategory.name?.trim() !== '') {
  //     const newCategory: Category = { name: this.newCategory.name?.trim(),
  //       id: 0, products: this.newCategory.products }
  //     this.categorySrvc.addCategory(newCategory).subscribe(() =>{
  //       this.loadCategories();
  //      // this.loadProducts();
  //       this.resetNewCategory();
  //     });
  //   }
  // }

  // addProductWithCategory() : void {
  //   if(this.selectedCategoryId && this.newProduct.name?.trim() !== '' && this.newProduct?.price !== undefined && 
  //       this.newProduct.price > 0 && this.newProduct.description !== undefined 
  //       && this.newProduct.description !== ''){
  //     this.newProduct.categoryId = this.selectedCategoryId;
  //     this.productSrvc.addProduct(this.newProduct).subscribe(() =>{
  //       this.loadCategories();
  //       this.loadProducts();
  //       this.resetNewProduct();
  //     });
  //   }
  // }

  // onUpdateCategory(updateCategory: Category): void {
  //   const index = this.categories.findIndex(x => x.id === updateCategory.id);
  //   if(index !== -1) {
  //     this.categories[index] = updateCategory;
  //   }
  //   this.editingCategory = {} as Category; //Reset editing state to an empty category object.
  //   this.loadCategories();
  //   this.loadProducts();
  // }

  // onCancelEdit(): void {
  //   this.editingCategory = {} as Category; //Reset editing state to an empty category object.
  // }

  // deleteCategory(id: number | undefined): void {
  //   if(id == undefined) return;
  //   const category = this.categories.find(c => c.id === id);
  //   if(!category) return;
  //   if(category.products && category.products.length > 0) {
  //     alert('Cannot delete category because it has associated products.');
  //     return;
  //   }
  //   this.categorySrvc.deleteCategory(id).subscribe(() => {
  //     this.loadCategories();
  //     this.loadProducts();
  //     // this.categories = this.categories.filter(ctgry => ctgry.id !== id);
  //     // this.products = this.products.filter(p => p.categoryId !== id); //
  //   });
  // }

  // editCategory(category: Category): void {
  //   this.editingCategory = { ...category} ; //Copy of Category object.
  // }

  // editProduct(id: number | undefined) {
  //     throw new Error('Method not implemented.');
  // }

  // deleteProduct(id: number | undefined) {
  //   if(id == undefined) return;
  //   this.productSrvc.deleteProduct(id).subscribe(() => {
  //     this.products = this.products.filter(p => p.id !== id);
  //     this.categories.forEach(catgry => {
  //       this.loadCategories();
  //       this.loadProducts();
  //       //catgry.products = this.products.filter(p => p.categoryId === catgry.id);
  //     });
  //   });
  // }

  // resetNewCategory() {
  //   this.newCategory.id = 0;
  //   this.newCategory.name = '';
  //   this.newCategory.products = [];
  // }

  // resetNewProduct() {
  //   this.newProduct.id = 0;
  //   this.newProduct.name = undefined;
  //   this.newProduct.price = undefined;
  //   this.newProduct.description = undefined;
  //   this.newProduct.categoryId = 0;
  //   this.selectedCategoryId = undefined;
  // }
}
