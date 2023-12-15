import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, RouterOutlet} from "@angular/router";
import {playersRoutes} from "./players-routing.module";
import { PlayerCardComponent } from './player-card/player-card.component';
import { PlayerInfoComponent } from './player-info/player-info.component';
import { PlayerNewComponent } from './player-new/player-new.component';
import { PlayersListComponent } from './players-list/players-list.component';
import {SharedModule} from "../../shared/shared.module";
import {PlayersInfoResolver} from "./player-info/players-info.resolver";



@NgModule({
  declarations: [
    PlayerCardComponent,
    PlayerInfoComponent,
    PlayerNewComponent,
    PlayersListComponent
  ],
    imports: [
        CommonModule,
        RouterOutlet,
        RouterModule.forChild(playersRoutes),
        SharedModule,
    ],
  providers: [
    PlayersInfoResolver
  ]
})
export class PlayersModule { }
