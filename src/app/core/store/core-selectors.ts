import {AppState} from '../../shared/app-state';
import {createSelector} from '@ngrx/store';
import {mccAdapter} from '../core.store';

const {
  selectAll
} = mccAdapter.getSelectors();

const selectFeature = (state: AppState) => state.core;

export const selectMccList = createSelector(
  selectFeature,
  selectAll
);
