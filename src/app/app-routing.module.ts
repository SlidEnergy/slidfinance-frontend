import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotLoggedInGuard} from './core/not-logged-in-guard.service';
import {AuthGuard} from './core/auth-guard.service';
import {AdminGuard} from './core/admin-guard.service';

const routes: Routes = [
  {path: '', loadChildren: './home/home.module#HomeModule'},
  {path: 'entry', loadChildren: './entry/entry.module#EntryModule', canActivate: [NotLoggedInGuard]},
  {path: 'banks', loadChildren: './banks/banks.module#BanksModule', canActivate: [AuthGuard]},
  {path: 'statictics', loadChildren: './statictics/statictics.module#StaticticsModule', canActivate: [AuthGuard]},
  {path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
