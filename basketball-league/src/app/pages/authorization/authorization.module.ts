import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {authRoutes} from "./authorization-routing.module";



@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(authRoutes)
  ]
})
export class AuthorizationModule { }
