import {RouterModule, Routes} from "@angular/router";
import {UiComponent} from "./ui/ui.component";
import {NgModule} from "@angular/core";
import {PagesComponent} from "./pages.component";
import {TeamListResolver} from "./teams/team-list.resolver";
import {PlayersListResolver} from "./players/players-list.resolver";

export const pagesRoutes: Routes = [
  {
    path: '', component: PagesComponent,
    children: [
      {path: 'ui', component: UiComponent},
      {path: 'teams', loadChildren: () => import('./teams/teams.module').then(m => m.TeamsModule), resolve: [TeamListResolver], data: {breadcrumb: 'Teams'}},
      {path: 'players', loadChildren: () => import('./players/players.module').then(m => m.PlayersModule), resolve: [PlayersListResolver], data: {breadcrumb: 'Players'}}
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

