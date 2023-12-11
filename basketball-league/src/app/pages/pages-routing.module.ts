import {RouterModule, Routes} from "@angular/router";
import {UiComponent} from "../ui/ui.component";
import {NgModule} from "@angular/core";
import {PagesComponent} from "./pages.component";
import {TeamsComponent} from "./teams/teams.component";
import {PlayersComponent} from "./players/players.component";

export const pagesRoutes: Routes = [
  {
    path: '', component: PagesComponent,
    children: [
      {path: 'ui', component: UiComponent},
      {path: 'teams', component: TeamsComponent},
      {path: 'players', component: PlayersComponent},
    ]
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(pagesRoutes),
  ],
  exports: [
    RouterModule,
  ]
})
export class PagesRoutingModule {
}

