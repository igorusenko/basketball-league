import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TeamsComponent} from "./teams.component";
import {PlayersComponent} from "../players/players.component";
import {RouterModule, RouterOutlet} from "@angular/router";
import {teamsRoutes} from "./teams-routing.module";
import {SharedModule} from "../../shared/shared.module";
import { TeamCardComponent } from './team-card/team-card.component';
import {TeamListResolver} from "./team-list.resolver";
import { TeamInfoComponent } from './team-info/team-info.component';



@NgModule({
  declarations: [
    TeamsComponent,
    TeamCardComponent,
    TeamInfoComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule.forChild(teamsRoutes),
    SharedModule,
  ],
  providers: [

  ]
})
export class TeamsModule { }
