import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Product } from '../../../../models/product.model';
import { ProductService } from '../../../../services/product.service';
import { Category } from '../../../../models/category.model';
import { CategoryService } from '../../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit {
  @Input() product: Product = {id:0, name: '',  categoryId: 0, description: '', price: 0}
  categories: Category[]= [];
  // @Output() updateProductEvent = new EventEmitter<Product>();
  // @Output() cancelEditEvent = new EventEmitter<void>();
  //categories: Category[] = [];

  constructor(
    private router: Router, private actvtdRoute: ActivatedRoute,
    private catgrySrvc: CategoryService,
    private prdctSrvc: ProductService){

    }

  async ngOnInit(): Promise<void> {
    const nvaigation = this.router.getCurrentNavigation();
    this.product = nvaigation?.extras?.state?.["product"] || {id:0,categoryId:0,description:'',name:'',price:0};

     if(this.product.name === '') {
      if(this.product.id === 0) {
        const id = this.actvtdRoute.snapshot.paramMap.get('id');
        if(!id) return
        this.product.id = +id;
        await this.loadProductsById(+id);
      }
     }

     this.catgrySrvc.getCategories().subscribe(catgrs => {
      this.categories = catgrs;
     });

      console.log('EditProductComponent: Categories:')
      console.log(this.product);
  }

  async loadProductsById(id: number): Promise<void> {
      this.prdctSrvc.getProductById(id).subscribe(prdct => {
        if(prdct) {
          this.product = prdct;
        }
    });
  
 }

  updateProduct(): void {
    if(!this.product || !this.product.id || this.product.id === 0 || this.product.categoryId === 0 || this.product.description === '' 
      || this.product.name === '' || this.product.price === undefined || this.product.price  <=0 ) 
      return;

    this.prdctSrvc.updateProduct(this.product).subscribe(_ =>{
      //this.updateProductEvent.emit(this.product);
      if(this.product.id)
        this.prdctSrvc.getProductById(this.product.id).subscribe(prdct => {
          this.product = prdct;
        });
    });
    alert("Product is updated.")
    this.router.navigate(['/categories'])
  }

  cancelEdit(): void {
    this.router.navigate(['/categories'])
    //this.cancelCategoryEvent.emit();
  }
}
