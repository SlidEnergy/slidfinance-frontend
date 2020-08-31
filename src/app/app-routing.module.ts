import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotLoggedInGuard} from './core/not-logged-in-guard.service';
import {AuthGuard} from './core/auth/auth-guard.service';
import {AdminGuard} from './core/auth/admin-guard.service';

const routes: Routes = [
    {path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
    {path: 'summary', loadChildren: () => import('./summary/summary.module').then(m => m.SummaryModule)},
    {
        path: 'entry',
        loadChildren: () => import('./entry/entry.module').then(m => m.EntryModule),
        canActivate: [NotLoggedInGuard]
    },
    {path: 'banks', loadChildren: () => import('./banks/banks.module').then(m => m.BanksModule), canActivate: [AuthGuard]},
    {
        path: 'statictics',
        loadChildren: () => import('./statictics/statictics.module').then(m => m.StaticticsModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
        canActivate: [AuthGuard]
    },
    {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AdminGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
