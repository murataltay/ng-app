import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../authentication-services/auth.service';
import { Observable } from 'rxjs';
import { auth } from '../authentication-models/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  error:string="";
  model:any = {
  email: "",
  password: ""
 }
 isLoginMode: boolean = true;
  constructor(private authService:AuthService, private router: Router) { }
  ngOnInit(): void {
  }
  handleAuth(form:NgForm):void{
     if(!form.valid)
     {
      return;
     }
     const email= form.value.email;
     const password= form.value.password;
     let responseAuth:Observable<auth>;
     if(this.isLoginMode)
     {
        responseAuth = this.authService.login(email, password);
     }
     else{
        responseAuth = this.authService.register(email, password);
     }
     responseAuth.subscribe({
      next: (result)=>{
        this.error="";
        this.router.navigate(['/']);
      },
      error:(err) =>{
          this.error= err;
      }
     })
  }
    toogleMode(){
      this.isLoginMode= !this.isLoginMode;
    }

}
