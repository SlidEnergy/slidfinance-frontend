import {Action, createAction, createReducer, on, props} from '@ngrx/store';
import {Category, Mcc} from '../api';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

// STATE

export const mccAdapter: EntityAdapter<Mcc> = createEntityAdapter<Mcc>({
  selectId: (mcc: Mcc) => mcc.id,
  sortComparer: (a: Mcc, b: Mcc) => a.code.localeCompare(b.code),
});

export interface CoreState extends EntityState<Mcc> {
  categories: Map<number, Category> | null;

  loadCategoriesError: { code: number, message: string } | null;
}

const initialState: CoreState = mccAdapter.getInitialState({
  categories: null,

  loadCategoriesError: null
});

export const loadMcc = createAction('[core] LOAD_MCC', props<{ mcc: Mcc[] }>());
export const loadCategories = createAction('[core] LOAD_CATEGORIES');
export const loadCategoriesCompleted = createAction('[core] LOAD_CATEGORIES_COMPLETED', props<{ errorCode: number, errorMessage: string, categories: Map<number, Category> | null }>());

const reducer = createReducer(initialState,
  on(loadMcc, (state, { mcc }) => {
    return mccAdapter.addAll(mcc, state);
  }),
  on(loadCategoriesCompleted, (state, {errorCode, errorMessage, categories}) => ({
    ...state,
    loadNodesError: errorCode ? {code: errorCode, message: errorMessage} : null,
    categories: categories
  }))
);

export function coreReducer(state: CoreState | undefined, action: Action) {
  return reducer(state, action);
}
