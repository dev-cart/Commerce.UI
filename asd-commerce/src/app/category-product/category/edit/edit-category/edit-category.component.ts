import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../services/category.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss'
})
export class EditCategoryComponent implements OnInit{

  //@Input() category: Category  = {products:[], name: '', id: 0} as Category //null;
  category: Category = {products:[], id:0, name:''};
  // @Output() updateCategoryEvent = new EventEmitter<void>();
 // @Output() updateCategoryEvent = new EventEmitter<Category>();
 // @Output() cancelCategoryEvent = new EventEmitter<void>();
  //categoryName: string | null = null; // sepearate property to hold the input value.

  constructor(private actvtdRoute: ActivatedRoute,
    private router: Router,
    private categorySrvc: CategoryService, private prdctSrvc: ProductService,
    private cdr: ChangeDetectorRef
  ){}

  async ngOnInit(): Promise<void> {
    //const navigationState = window.history.state;
    const nvaigation = this.router.getCurrentNavigation();
    this.category = nvaigation?.extras?.state?.["category"] || {id:0,products:[],name:''};

     if(this.category.name === '') {
      if(this.category.id === 0) {
        const id = this.actvtdRoute.snapshot.paramMap.get('id');
        if(!id) return
        this.category.id = +id;
        await this.loadProductsByCategoryId(+id);
      }
     }
  }

  async loadProductsByCategoryId(id: number): Promise<void> {
    await this.categorySrvc.getCategoryById(id).subscribe(catgry => {
      this.category = catgry;
      this.prdctSrvc.getProducts().subscribe(prdcts => {
        if(prdcts && prdcts.length > 0 && this.category) {
          this.category.products = prdcts.filter(p => p.categoryId === catgry.id);
        }
      })});
 }

//  async loadProductsByCategoryId(): Promise<void> {
//     this.productSrvc.getProducts().subscribe(prdcts => {
//      this.products = prdcts;
//      if(prdcts && prdcts.length > 0 && this.categories && this.categories.length) {
//          this.categories.forEach(catgry => {
//            catgry.products = this.products.filter(p => p.categoryId === catgry.id);
//        });
//      }
//    })
//  }

  updateCategory(): void {
    if(!this.category || this.category.id === 0 || this.category.name === '') return;
    //this.category.name = this.categoryName ?? undefined;
   // const updatedCategory = {...this.category, name: this.categoryName};
    this.categorySrvc.updateCategory(this.category).subscribe(updateCategory =>{
        //this.updateCategoryEvent.emit(this.category);
        alert("Category is updated.")
        this.router.navigate(['/categories'])
    });
  }

  cancelEdit(): void {
    this.router.navigate(['/categories']);
    //this.cancelCategoryEvent.emit();
  }

}
