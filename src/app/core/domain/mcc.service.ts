import {Injectable} from '@angular/core';
import {AppState} from '../../shared/app-state';
import {Store} from '@ngrx/store';
import {mccListSelector, selectNeedMcc} from '../store/core-selectors';
import {distinctUntilChanged, filter, map, mapTo, share, startWith, switchMap, tap} from 'rxjs/operators';
import * as coreActions from '../store/core.store';
import {combineLatest, Observable} from 'rxjs';
import * as api from '../../api';
import {Mcc} from './mcc';

@Injectable({
  providedIn: 'root'
})
export class MccService {

  requireMcc = this.store.pipe(
    selectNeedMcc,
    filter(needMcc => needMcc),
    switchMap(() => this.mccService.getList()),
    tap(mcc => this.store.dispatch(coreActions.loadMcc({mcc}))),
    mapTo(undefined),
    share()
  );

  constructor(
    private store: Store<AppState>,
    private mccService: api.MccService
  ) {
  }

  getList(): Observable<Mcc[]> {
    return combineLatest([
      this.requireMcc.pipe(startWith(() => undefined)),
      this.store.select(mccListSelector)
    ]).pipe(
      map(([require, mcc])=> mcc),
      distinctUntilChanged(),
      map(mcc => mcc.map(model => new Mcc(model)))
    );
  }
}
