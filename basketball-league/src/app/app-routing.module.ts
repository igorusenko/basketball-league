import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthorizeGuard} from "./core/guard/auth.guard";
import {NotFoundComponent} from "./pages/not-found/not-found.component";

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate: [AuthorizeGuard]
  },
  {
    path: 'authorization', loadChildren: () => import('./pages/authorization/authorization.module').then(m => m.AuthorizationModule)
  },
  {path: '404', component: NotFoundComponent},
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
