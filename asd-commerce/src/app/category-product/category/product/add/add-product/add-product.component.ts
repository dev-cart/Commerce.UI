import { Component, OnInit } from '@angular/core';
import { EditProductComponent } from '../../edit/edit-product/edit-product.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category } from '../../../../models/category.model';
import { CategoryService } from '../../../../services/category.service';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {
  categories: Category[] = [];
  newProduct: Product = {};// {categoryId:0,description:'',id:0,name:'',price:0};

  
  constructor(private actvtdRoute: ActivatedRoute,
    private router: Router,
    private prdctSrvc: ProductService,
    private catgrySrvc: CategoryService
  ){}
  
  async ngOnInit(): Promise<void> {
    //const navigationState = window.history.state;
    const nvaigation = this.router.getCurrentNavigation();
    this.categories = nvaigation?.extras?.state?.["categories"] || [];
    if(!this.categories || this.categories.length <= 0 ) {
      await this.catgrySrvc.getCategories().subscribe(catgrs => {
        if(!catgrs) {
          alert('Categories are missing. Product cannot be added without an associated category.');
          this.router.navigate(['/categories']);
          return;
        }
        this.categories = catgrs;
        const categoryId = this.actvtdRoute.snapshot.paramMap.get('categoryId');
        if(!categoryId || categoryId.trim() == '') {
          // alert("error!")
          alert('Category is missing. Product cannot be added without an associated category.');
          this.router.navigate(['/categories']);
          return;
        }
        //this.categories.find(catgry => catgry.id === +categoryId);
        this.newProduct.categoryId = +categoryId;
      });
    }
  }
  
  addProduct(): void {
    
    if(!this.newProduct // || !this.newProduct.id || this.newProduct.id <= 0 
      || this.newProduct.categoryId === 0 || this.newProduct.description?.trim() === '' 
      || this.newProduct.name?.trim() === '' || this.newProduct.price === undefined 
      || this.newProduct.price  <=0 ) 
      return; // can place error messages here.

     // alert('product validated')
    this.prdctSrvc.addProduct(this.newProduct).subscribe(_ =>{
      //this.updateProductEvent.emit(this.product);
    });

    //alert("Product is added.")
    this.router.navigate(['/categories'])
  }

  cancelAdd(): void {
    this.router.navigate(['/categories'])
    //this.cancelCategoryEvent.emit();
  }

}
