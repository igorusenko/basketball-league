import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiComponent } from './ui/ui.component';
import { InputComponent } from './shared/input/input.component';
import {ReactiveFormsModule} from "@angular/forms";
import { SearchComponent } from './shared/search/search.component';
import { SelectComponent } from './shared/select/select.component';
import { MultiselectComponent } from './shared/multiselect/multiselect.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ButtonComponent } from './shared/button/button.component';
import { PaginatorComponent } from './shared/paginator/paginator.component';
import { HeaderComponent } from './layouts/header/header.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {AuthorizeGuard} from "./core/guard/auth.guard";
import {AuthService} from "./core/services/auth.service";
import {CommonModule} from "@angular/common";
import {HttpInterceptor} from "./core/interceptors/http.interceptor";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    HttpClient,
    AuthService,
    AuthorizeGuard,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
