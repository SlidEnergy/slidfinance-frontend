import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import { SettingsPageComponent } from './settings-page.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'settings',
    pathMatch: 'full',
  },
  {
    path: 'settings',
    component: SettingsPageComponent,
  },
];

@NgModule({
  declarations: [SettingsPageComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfileModule { }
