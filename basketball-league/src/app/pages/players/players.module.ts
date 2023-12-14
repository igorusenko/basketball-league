import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlayersComponent} from "./players.component";
import {RouterModule, RouterOutlet} from "@angular/router";
import {playersRoutes} from "./players-routing.module";
import { PlayerCardComponent } from './player-card/player-card.component';
import { PlayerInfoComponent } from './player-info/player-info.component';
import { PlayerNewComponent } from './player-new/player-new.component';
import { PlayersListComponent } from './players-list/players-list.component';



@NgModule({
  declarations: [
    PlayersComponent,
    PlayerCardComponent,
    PlayerInfoComponent,
    PlayerNewComponent,
    PlayersListComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule.forChild(playersRoutes),
  ]
})
export class PlayersModule { }
