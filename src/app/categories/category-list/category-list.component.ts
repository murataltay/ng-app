import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category-services/category.service';
import { Category } from '../category-models/category';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  providers: [CategoryService]
})
export class CategoryListComponent implements OnInit {
  categories: Category[];
  selectedCategory: Category | null;
  displayAll:boolean
  constructor(private categoryService:CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(result => {
    this.categories=result;
    })
  }

  selectCategory(category?: Category) {
    if(category)
    {
        this.selectedCategory = category;
        this.displayAll=false;
    }
    else
    {
      this.selectedCategory = null;
      this.displayAll = true;
    }
  }
}
