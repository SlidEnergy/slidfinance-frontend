import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import { UsersPageComponent } from './users/users-page.component';
import { UserListComponent } from './users/user-list.component';
import {BanksPageComponent} from './banks/banks-page.component';
import {BankListComponent} from './banks/bank-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UsersPageComponent },
  { path: 'banks', component: BanksPageComponent },
];

@NgModule({
  declarations: [
    UsersPageComponent,
    UserListComponent,
    BanksPageComponent,
    BankListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
