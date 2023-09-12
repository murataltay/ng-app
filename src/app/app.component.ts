import { Component, OnInit } from '@angular/core';
import { ProductService } from './products/product-services/product.service';
import { AuthService } from './authentication/authentication-services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductService]
})
export class AppComponent implements OnInit{
  constructor(private authService : AuthService){}
  ngOnInit(): void {
    this.authService.autoLogin();
  }

}
