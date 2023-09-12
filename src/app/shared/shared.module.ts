import { NgModule } from "@angular/core";
import { NavbarComponent } from "./navbar/navbar.component";
import { HomeComponent } from "./home/home.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthenticationModules } from "../authentication/authentication.module";
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    NotFoundComponent
  ],
  imports:[
    CommonModule,
    RouterModule,
    AuthenticationModules
  ],
  exports:[
    HomeComponent,
    NavbarComponent
  ]
})
export  class SharedModules
{

}
