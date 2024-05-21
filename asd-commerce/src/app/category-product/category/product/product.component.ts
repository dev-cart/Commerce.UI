import { Component, Input } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { NgFor, CommonModule } from '@angular/common';
import { Category } from '../../models/category.model';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductListComponent } from "./list/product-list/product-list.component";
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-product',
    standalone: true,
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss',
    imports: [CommonModule, ProductListComponent, RouterModule]
})
export class ProductComponent {
  @Input() category: Category = {products:[],id:0,name:''};

  constructor(private route: Router){}

  ngOnInit(): void {
  }
}
