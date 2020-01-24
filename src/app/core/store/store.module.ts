import { NgModule } from '@angular/core';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {coreReducer} from './core.store';
import {EffectsModule} from '@ngrx/effects';
import {CoreEffects} from './core.effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../../environments/environment';
import {EntityDataModule} from "@ngrx/data";
import {StoreModule as NgrxStoreModule} from "@ngrx/store";
import {entityConfig} from './entity/entity-metadata';

@NgModule({
  declarations: [],
  imports: [
    StoreRouterConnectingModule.forRoot(),
    NgrxStoreModule.forRoot({core: coreReducer}),
    EffectsModule.forRoot([CoreEffects]),
    EntityDataModule.forRoot(entityConfig),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ]
})
export class StoreModule { }
