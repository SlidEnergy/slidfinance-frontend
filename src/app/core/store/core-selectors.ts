import {AppState} from '../../shared/app-state';
import {createSelector, select} from '@ngrx/store';
import {CoreState, mccAdapter} from './core.store';
import {pipe} from 'rxjs';
import {filter, map} from 'rxjs/operators';

const {
  selectAll,
  selectEntities
} = mccAdapter.getSelectors();

const selectMccFeature = (state: AppState) => state.core.mcc;

export const mccListSelector = createSelector(
  selectMccFeature,
  selectAll
);

export const selectLoadMccRequired = pipe(
  select(selectMccFeature),
  map(mcc => !mcc.loaded && !mcc.loading)
);

export const mccMapSelector = createSelector(
  selectMccFeature,
  selectEntities,
);

export const selectMccById = (id) => {
  return pipe(
    select(mccMapSelector),
    map(mcc => mcc[id])
  );
};
