import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PlayersComponent} from "./players.component";
import {PlayersListResolver} from "./players-list.resolver";
import {PlayersListComponent} from "./players-list/players-list.component";
import {PlayerNewComponent} from "./player-new/player-new.component";
import {PlayerInfoComponent} from "./player-info/player-info.component";
import {TeamListResolver} from "../teams/team-list.resolver";
import {PlayersInfoResolver} from "./player-info/players-info.resolver";

export const playersRoutes: Routes = [
  {
    path: '', component: PlayersComponent,
    children: [
      {path: '', component: PlayersListComponent},
      {path: 'new', component: PlayerNewComponent, data: {breadcrumb: 'Add new Player'}, resolve: [TeamListResolver]},
      {path: ':id', children: [
          {path: 'edit', component: PlayerNewComponent, data: {breadcrumb: 'Edit'}, resolve: [TeamListResolver]},
          {path: '', component: PlayerInfoComponent, resolve: [PlayersListResolver], data: {breadcrumb: 'View'}},
        ], resolve: [PlayersInfoResolver]},
    ]
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(playersRoutes)
  ],
  exports: [
    RouterModule,
  ]
})
export class PlayersModule { }
