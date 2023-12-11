import { NgModule } from '@angular/core';
import {RouterModule, RouterOutlet} from "@angular/router";
import {pagesRoutes} from "./pages-routing.module";
import {UiComponent} from "../ui/ui.component";
import {SharedModule} from "../shared/shared.module";
import { PagesComponent } from './pages.component';
import {HeaderComponent} from "../layouts/header/header.component";
import {NavbarComponent} from "../layouts/navbar/navbar.component";
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';



@NgModule({
  declarations: [
    UiComponent,
    PagesComponent,
    HeaderComponent,
    NavbarComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    SharedModule,
    RouterOutlet,
    RouterModule.forChild(pagesRoutes),
  ],
  exports: [
    HeaderComponent,
    NavbarComponent
  ]
})
export class PagesModule { }
