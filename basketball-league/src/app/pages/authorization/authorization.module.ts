import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {authRoutes} from "./authorization-routing.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(authRoutes),
    ReactiveFormsModule
  ]
})
export class AuthorizationModule { }
