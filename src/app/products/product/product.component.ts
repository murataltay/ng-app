import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product-services/product.service';
import { Product } from '../product-models/product';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {
  product: Product;
  constructor(private route: ActivatedRoute, private productService : ProductService) {
  }
  ngOnInit(): void {
    this.route.params.subscribe(params=> {
      const id = params["productId"];
      this.productService.getProductById(id).subscribe(result => {
          this.product = {...result, id:id}
      });
    });
  }
}
