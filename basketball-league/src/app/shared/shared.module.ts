import { NgModule } from '@angular/core';
import {InputComponent} from "./input/input.component";
import {SearchComponent} from "./search/search.component";
import {SelectComponent} from "./select/select.component";
import {MultiselectComponent} from "./multiselect/multiselect.component";
import {ButtonComponent} from "./button/button.component";
import {PaginatorComponent} from "./paginator/paginator.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [
    InputComponent,
    SearchComponent,
    SelectComponent,
    MultiselectComponent,
    ButtonComponent,
    PaginatorComponent,
    BreadcrumbComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterLink
  ],
    exports: [
        InputComponent,
        SearchComponent,
        SelectComponent,
        MultiselectComponent,
        ButtonComponent,
        PaginatorComponent,
        BreadcrumbComponent
    ]
})
export class SharedModule { }
