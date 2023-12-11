import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlayersComponent} from "./players.component";
import {RouterModule, RouterOutlet} from "@angular/router";
import {playersRoutes} from "./players-routing.module";



@NgModule({
  declarations: [
    PlayersComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule.forChild(playersRoutes),
  ]
})
export class PlayersModule { }
