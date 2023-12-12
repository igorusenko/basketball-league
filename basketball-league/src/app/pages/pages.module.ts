import { NgModule } from '@angular/core';
import {RouterModule, RouterOutlet} from "@angular/router";
import {pagesRoutes} from "./pages-routing.module";
import {UiComponent} from "../ui/ui.component";
import {SharedModule} from "../shared/shared.module";
import { PagesComponent } from './pages.component';
import {HeaderComponent} from "../layouts/header/header.component";
import {NavbarComponent} from "../layouts/navbar/navbar.component";
import { SignInComponent } from '../authorization/sign-in/sign-in.component';
import { SignUpComponent } from '../authorization/sign-up/sign-up.component';
import { TeamsComponent } from './teams/teams.component';
import { PlayersComponent } from './players/players.component';
import {TeamListResolver} from "./teams/team-list.resolver";



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
  ],
  exports: [
    HeaderComponent,
    NavbarComponent
  ],
  providers: [
    TeamListResolver
  ]
})
export class PagesModule { }
