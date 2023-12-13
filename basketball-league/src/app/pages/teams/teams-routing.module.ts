import {NgModule} from '@angular/core';
import {TeamsComponent} from "./teams.component";
import {RouterModule, Routes} from "@angular/router";
import {TeamsListInterface} from "../../core/interfaces/team-interface";
import {TeamListResolver} from "./team-list.resolver";
import {TeamInfoComponent} from "./team-info/team-info.component";
import {TeamsInfoResolver} from "./team-info/teams-info-resolver";
import {PlayersListResolver} from "../players/players-list.resolver";
import {TeamNewComponent} from "./team-new/team-new.component";

export const teamsRoutes: Routes = [
  {path: '', component: TeamsComponent},
  {path: 'new', component: TeamNewComponent},
  {path: ':id/edit', component: TeamNewComponent},
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
export class TeamsModule {
}
