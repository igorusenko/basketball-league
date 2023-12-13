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
import {TeamsInfoResolver} from "./team-info/teams-info-resolver";
import {PlayersListResolver} from "../players/players-list.resolver";
import { TeamNewComponent } from './team-new/team-new.component';



@NgModule({
  declarations: [
    TeamsComponent,
    TeamCardComponent,
    TeamInfoComponent,
    TeamNewComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule.forChild(teamsRoutes),
    SharedModule,
  ],
  providers: [
    TeamsInfoResolver,
    PlayersListResolver
  ]
})
export class TeamsModule { }
