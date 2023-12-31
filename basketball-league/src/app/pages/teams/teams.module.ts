import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, RouterOutlet} from "@angular/router";
import {teamsRoutes} from "./teams-routing.module";
import {SharedModule} from "../../shared/shared.module";
import { TeamCardComponent } from './team-card/team-card.component';
import { TeamInfoComponent } from './team-info/team-info.component';
import {TeamsInfoResolver} from "./team-info/teams-info-resolver";
import {PlayersListResolver} from "../players/players-list.resolver";
import { TeamNewComponent } from './team-new/team-new.component';
import { TeamsListComponent } from './teams-list/teams-list.component';



@NgModule({
  declarations: [
    TeamCardComponent,
    TeamInfoComponent,
    TeamNewComponent,
    TeamsListComponent
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
