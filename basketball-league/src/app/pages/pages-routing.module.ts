import {RouterModule, Routes} from "@angular/router";
import {UiComponent} from "../ui/ui.component";
import {NgModule} from "@angular/core";
import {PagesComponent} from "./pages.component";

export const pagesRoutes: Routes = [
  {
    path: '', component: PagesComponent,
    children: [
      {path: 'ui', component: UiComponent},
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

