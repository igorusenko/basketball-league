import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PlayersComponent} from "./players.component";

export const playersRoutes: Routes = [
  {
    path: '', component: PlayersComponent,
    children: [
      {path: 'players', component: PlayersComponent}
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
