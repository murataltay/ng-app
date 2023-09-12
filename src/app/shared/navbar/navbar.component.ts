import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/authentication-services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAuthenticad: boolean = false;
  constructor(private authenService: AuthService, private route: Router) {}

  ngOnInit(): void {
    this.authenService.user.subscribe((user) => {
      this.isAuthenticad = !!user;
    });
  }
  logOut(){
    this.authenService.logOut();
    this.route.navigate(['/auth']);
    this.isAuthenticad=false;
  };
}
