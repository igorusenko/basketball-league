import { NgModule } from '@angular/core';
import {TeamsComponent} from "./teams.component";
import {RouterModule, Routes} from "@angular/router";
import {TeamsListInterface} from "../../core/interfaces/team-interface";
import {TeamListResolver} from "./team-list.resolver";
import {TeamInfoComponent} from "./team-info/team-info.component";
import {TeamsInfoResolver} from "./team-info/teams-info-resolver";
import {PlayersListResolver} from "../players/players-list.resolver";

export const teamsRoutes: Routes = [
      {path: '', component: TeamsComponent},
      {path: ':id', component: TeamInfoComponent, resolve: [TeamsInfoResolver, PlayersListResolver]},
]

@NgModule({
  imports: [
    RouterModule.forChild(teamsRoutes)
  ],
  exports: [
    RouterModule,
  ]
})
export class TeamsModule { }
