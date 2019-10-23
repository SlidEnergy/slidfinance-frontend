import {AppState} from '../../shared/app-state';
import {createSelector, select} from '@ngrx/store';
import {CoreState, mccAdapter} from './core.store';
import {pipe} from 'rxjs';
import {filter, map} from 'rxjs/operators';

const {
  selectAll
} = mccAdapter.getSelectors();

const selectMccFeature = (state: AppState) => state.core.mcc;

export const mccListSelector = createSelector(
  selectMccFeature,
  selectAll
);

export const selectNeedMcc = pipe(
  select(selectMccFeature),
  map(mcc => !mcc.loaded)
)
