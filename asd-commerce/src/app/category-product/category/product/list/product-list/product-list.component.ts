import { Component, Input } from '@angular/core';
import { Category } from '../../../../models/category.model';
import { ProductService } from '../../../../services/product.service';
import { Router } from '@angular/router';
import { Product } from '../../../../models/product.model';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  @Input() category: Category = {products:[],id:0,name:''};

  constructor(private productSrvc: ProductService, 
    private router: Router){
      console.log('ProductListComponent: Categories:')
      console.log(this.category);
    }

  editProductNav(product: Product): void {  // Navigate to edit categories.
    this.router.navigate(['/products', 'edit', product.id], 
      {state: { product: product } });
  }

  deleteProduct(id: number | undefined) {
    if(id == undefined) return;
    this.productSrvc.deleteProduct(id).subscribe(() => {
      this.category.products = this.category.products.filter(p => p.id !== id);
    });
  }

}
