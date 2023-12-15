import { NgModule } from '@angular/core';
import {RouterModule, RouterOutlet} from "@angular/router";
import {pagesRoutes} from "./pages-routing.module";
import {UiComponent} from "../ui/ui.component";
import {SharedModule} from "../shared/shared.module";
import { PagesComponent } from './pages.component';
import {HeaderComponent} from "../layouts/header/header.component";
import {NavbarComponent} from "../layouts/navbar/navbar.component";
import {TeamListResolver} from "./teams/team-list.resolver";
import {PlayersListResolver} from "./players/players-list.resolver";
import {NgIf, NgStyle} from "@angular/common";



@NgModule({
  declarations: [
    UiComponent,
    PagesComponent,
    HeaderComponent,
    NavbarComponent
  ],
  imports: [
    SharedModule,
    RouterOutlet,
    RouterModule.forChild(pagesRoutes),
    NgStyle,
    NgIf,
  ],
  exports: [
    HeaderComponent,
    NavbarComponent
  ],
  providers: [
    TeamListResolver,
    PlayersListResolver
  ]
})
export class PagesModule { }
