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

@NgModule({
  declarations: [
    AppComponent,
    UiComponent,
    InputComponent,
    SearchComponent,
    SelectComponent,
    MultiselectComponent,
    ButtonComponent,
    PaginatorComponent,
    HeaderComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    HeaderComponent,
    NavbarComponent
  ]
})
export class AppModule { }
