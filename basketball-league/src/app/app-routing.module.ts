import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthorizeGuard} from "./core/guard/auth.guard";
import {SignInComponent} from "./authorization/sign-in/sign-in.component";
import {SignUpComponent} from "./authorization/sign-up/sign-up.component";

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate: [AuthorizeGuard]
  },
  {
    path: 'authorization', loadChildren: () => import('./authorization/authorization.module').then(m => m.AuthorizationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
