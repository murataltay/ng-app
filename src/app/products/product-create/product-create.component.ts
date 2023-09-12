import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ProductService } from '../product-services/product.service';
import { CategoryService } from 'src/app/categories/category-services/category.service';
import { Category } from 'src/app/categories/category-models/category';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
  providers: [ProductService,CategoryService]
})
export class ProductCreateComponent implements OnInit {
  categories: Category[]=[];
  error: string="";
  model:any={
    name:"deneme"
  };
  constructor(
    private productService:ProductService,
    private categoryService:CategoryService,
    private router:Router) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(result=>{
      console.log(result);
      this.categories=result;
    })
  }
  saveProduct(form:NgForm) {
    const extensions= ["jpeg", "jpg", "png"];
    const extension = this.model.imageUrl.split(".").pop();
    if(extensions.indexOf(extension)==-1)
    {
      this.error = 'resim uzantısı sadece jpeg,jpg,png olmalıdır.';
      return;
    }
      const product = {
        id: '1',
        name: this.model.name,
        price: this.model.price,
        imageUrl: this.model.imageUrl,
        description: this.model.description,
        isActive: this.model.isActive,
        categoryId: this.model.categoryId,
      };
      if(form.valid)
      {
         this.productService.createProduct(product).subscribe((result) => {
           this.router.navigate(['/products']);
         });
      }
      else
      {
        this.error="formu  kontrol  ediniz."
      }
  }
}
