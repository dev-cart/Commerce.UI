import { Routes } from '@angular/router';
import { CategoryComponent } from './category-product/category/category.component';
import { ProductComponent } from './category-product/category/product/product.component';
import { CategoryListComponent } from './category-product/category/list/category-list/category-list.component';
import { AddCategoryComponent } from './category-product/category/add/add-category/add-category.component';
import { EditCategoryComponent } from './category-product/category/edit/edit-category/edit-category.component';
import { ProductListComponent } from './category-product/category/product/list/product-list/product-list.component';
import { AddProductComponent } from './category-product/category/product/add/add-product/add-product.component';
import { EditProductComponent } from './category-product/category/product/edit/edit-product/edit-product.component';

export const routes: Routes = [
    {path: 'categories', component: CategoryComponent, 
        children: [
            {path: '', component: CategoryListComponent},
            {path: 'add', component: AddCategoryComponent},
            {path: 'edit/:id', component: EditCategoryComponent},
            
            {path: 'products', component: ProductComponent, 
                children: [
                    {path: '', component: ProductListComponent},
                    {path: 'add/:categoryId', component: AddProductComponent},
                    {path: 'edit/:id', component: EditProductComponent},
                ]
            },
        ]
    },

    {path: 'products', component: ProductComponent, 
        children: [
            {path: '', component: ProductListComponent},
            {path: 'add/:categoryId', component: AddProductComponent},
            {path: 'edit/:id', component: EditProductComponent},
        ]
    },

    {path: '', redirectTo: '/categories', pathMatch: 'full'}, // Default route: redirect to categories
    {path: '**', redirectTo: '/categories'}
];
