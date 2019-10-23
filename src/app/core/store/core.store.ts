import {Action, createAction, createReducer, on, props} from '@ngrx/store';
import {Category, Mcc} from '../../api';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

// STATE

export const mccAdapter: EntityAdapter<Mcc> = createEntityAdapter<Mcc>({
  selectId: (mcc: Mcc) => mcc.id,
  sortComparer: (a: Mcc, b: Mcc) => a.code.localeCompare(b.code),
});

interface MccState extends EntityState<Mcc> {
  loaded: boolean;
}

export interface CoreState {
  categories: Map<number, Category> | null;
  mcc: MccState;

  loadCategoriesError: { code: number, message: string } | null;
}

const initialState: CoreState = {
  categories: null,
  mcc: mccAdapter.getInitialState({loaded: false}),

  loadCategoriesError: null
};

export const loadMcc = createAction('[core] LOAD_MCC', props<{ mcc: Mcc[] }>());
export const loadCategories = createAction('[core] LOAD_CATEGORIES');
export const loadCategoriesCompleted = createAction('[core] LOAD_CATEGORIES_COMPLETED', props<{ errorCode: number, errorMessage: string, categories: Map<number, Category> | null }>());

const reducer = createReducer(initialState,
  on(loadMcc, (state, {mcc}) => ({
    ...state,
    mcc: mccAdapter.addAll(mcc, { ...state.mcc, loaded: true })
  })),
  on(loadCategoriesCompleted, (state, {errorCode, errorMessage, categories}) => ({
    ...state,
    loadNodesError: errorCode ? {code: errorCode, message: errorMessage} : null,
    categories: categories
  }))
);

export function coreReducer(state: CoreState | undefined, action: Action) {
  return reducer(state, action);
}
