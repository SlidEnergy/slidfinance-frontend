import {Injectable} from '@angular/core';
import * as api from '../api';
import {mccListSelector, mccMapSelector, selectLoadMccRequired} from './store/core-selectors';
import {catchError, distinctUntilChanged, filter, finalize, mapTo, share, startWith, switchMap, tap} from 'rxjs/operators';
import * as coreActions from './store/core.store';
import {muteFirst} from './store/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../shared/app-state';
import {of, throwError} from 'rxjs';
import {loadMccCompleted} from './store/core.store';
import {AccountsService, ProductsService} from '../api';

@Injectable({
  providedIn: 'root'
})
export class ApiContextService {

  loadMccIfRequired = this.store.pipe(
    selectLoadMccRequired,
    filter(needMcc => needMcc),
    distinctUntilChanged(),
    tap(mcc => this.store.dispatch(coreActions.loadMcc())),
    switchMap(() => this.mccService.getList()),
    tap(mcc => this.store.dispatch(coreActions.loadMccCompleted({mcc}))),
    catchError((error => {
      console.log('CATCH ERROR');
      console.log(error);
      return throwError(error);
    })),
    finalize(() => {
      console.log('FINALIZE');
      this.store.dispatch(coreActions.loadMccCanceled());
    }),
    mapTo(undefined),
    share()
  );

  // mcc = muteFirst(
  //   this.loadMccIfRequired.pipe(startWith(() => undefined)),
  //   this.store.select(mccListSelector)
  // );

  mccDict = muteFirst(
    this.loadMccIfRequired.pipe(startWith(() => undefined)),
    //of(undefined),
    this.store.select(mccMapSelector)
  );

  accounts = this.accountsService.getList().pipe(share());

  products = this.productsService.getList().pipe(share());

  constructor(private mccService: api.MccService,
              private accountsService: AccountsService,
              private productsService: ProductsService,
              private store: Store<AppState>) {

  }
}
