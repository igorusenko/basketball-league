import { NgModule } from '@angular/core';
import {TeamsComponent} from "./teams.component";
import {RouterModule, Routes} from "@angular/router";

export const teamsRoutes: Routes = [
  {
    path: '', component: TeamsComponent,
    children: [
      {path: 'teams', component: TeamsComponent}
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
export class TeamsModule { }
