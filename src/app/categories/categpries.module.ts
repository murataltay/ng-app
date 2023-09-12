import { NgModule } from "@angular/core";
import { CategoryCreateComponent } from "./category-create/category-create.component";
import { CategoryListComponent } from "./category-list/category-list.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
const routes: Routes = [
  {
    path: 'categories',
    children: [
      { path: 'create', component: CategoryCreateComponent },
      { path: '', component: CategoryListComponent },
    ],
  },
];
@NgModule({
  declarations: [
    CategoryCreateComponent,
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    CategoryCreateComponent,
    CategoryListComponent
  ]
})
export  class CategoriesModule{

}
