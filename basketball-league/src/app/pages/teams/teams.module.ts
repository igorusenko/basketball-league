import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TeamsComponent} from "./teams.component";
import {PlayersComponent} from "../players/players.component";
import {RouterModule, RouterOutlet} from "@angular/router";
import {teamsRoutes} from "./teams-routing.module";



@NgModule({
  declarations: [
    TeamsComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule.forChild(teamsRoutes),
  ]
})
export class TeamsModule { }
