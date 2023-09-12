import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, tap } from "rxjs";
import { AuthService } from "./authentication-services/auth.service";
import { environment } from "src/environments/environment";

@Injectable({providedIn:"root"})
export  class AdminGuard implements CanActivate
{
  constructor(private authService: AuthService, private route:Router) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return  this.authService.user.pipe(
      map(user=>{
        return !!user && user.email==environment.admin_user
      }),
      tap(isAdmin =>{
         if(!isAdmin){
          this.route.navigate(["/"]);
         }
      })
    )
  }
}
