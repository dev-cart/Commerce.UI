import { Component } from '@angular/core';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../services/category.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {

  newCategory: Category = {name: undefined, products: [], id:0}

  constructor(private catgrySrvc: CategoryService,
    private router: Router
  ){

  }

  addCategory(): void {
    //if(this.newCategory.name?.trim() !== '') {
    if(this.newCategory.name) {
      const newCategory: Category = { name: this.newCategory.name?.trim(),
        id: 0, products: this.newCategory.products }
      this.catgrySrvc.addCategory(newCategory).subscribe(() =>{
        alert("Category added.")
        this.router.navigate(['/categories']);
      });
    }
  }

  cancelAdd() {
    this.router.navigate(['/categories']);
  }
}
