import {NgModule, Optional, SkipSelf} from '@angular/core';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {coreReducer} from './core.store';
import {EffectsModule} from '@ngrx/effects';
import {CoreEffects} from './core.effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../../environments/environment';
import {ENTITY_METADATA_TOKEN, EntityDataModule, PLURAL_NAMES_TOKEN} from '@ngrx/data';
import {StoreModule as NgrxStoreModule} from '@ngrx/store';
import {createEntityConfig} from '../entity/entity-metadata';

const entityConfig = createEntityConfig();

@NgModule({
    declarations: [],
    imports: [
        StoreRouterConnectingModule.forRoot(),
        NgrxStoreModule.forRoot({core: coreReducer}),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
        }),
        EffectsModule.forRoot([CoreEffects]),
        EntityDataModule.forRoot({}),
    ],
    providers: [
        // Вынес регистрацию токенов из EntityDataModule, т.к. выскакивала ошибка: Function calls are not supported in decorators
        {
            provide: ENTITY_METADATA_TOKEN,
            multi: true,
            useValue: entityConfig.entityMetadata,
        },
        {
            provide: PLURAL_NAMES_TOKEN,
            multi: true,
            useValue: entityConfig.pluralNames,
        },
    ],
})
export class StoreModule {
    constructor(@Optional() @SkipSelf() parentModule: StoreModule) {
        if (parentModule) {
            throw new Error("StoreModule is already loaded. Import it in the AppModule only");
        }
    }
}
