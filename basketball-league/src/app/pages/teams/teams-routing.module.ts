import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TeamInfoComponent} from "./team-info/team-info.component";
import {TeamsInfoResolver} from "./team-info/teams-info-resolver";
import {PlayersListResolver} from "../players/players-list.resolver";
import {TeamNewComponent} from "./team-new/team-new.component";
import {TeamsListComponent} from "./teams-list/teams-list.component";

export const teamsRoutes: Routes = [
  {path: '', component: TeamsListComponent},
  {path: 'new', component: TeamNewComponent, data: {breadcrumb: 'Add new Team'}},
  {
    path: ':id', children: [
      {path: 'edit', component: TeamNewComponent, data: {breadcrumb: 'Edit'}},
      {
        path: '',
        component: TeamInfoComponent,
        resolve: [TeamsInfoResolver, PlayersListResolver],
        data: {breadcrumb: 'View'}
      },
    ]
  },
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
