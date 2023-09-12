import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../category-services/category.service';


@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css'],
  providers: [CategoryService]
})
export class CategoryCreateComponent implements OnInit {

  constructor(
    private categoryService:CategoryService,
    private router:Router) { }

  ngOnInit(): void {
  }
  saveCategory(name:any){
    const category= {
      id:"1",
      name:name.value
    };
    this.categoryService.createCategory(category).subscribe(result=>{
      console.log(result);
      this.router.navigate(['/products']);
    })
  }

}
