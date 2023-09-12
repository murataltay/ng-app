import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product-services/product.service';
import { Product } from '../product-models/product';
@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading:boolean=false;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.loading = true;
      this.productService
        .getProducts(params['categoryId'])
        .subscribe((result) => {
          this.products = result;
          this.loading = false;
        });
    });
  }
}
