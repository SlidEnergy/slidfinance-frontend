import {Action, createAction, createReducer, on, props} from '@ngrx/store';

// STATE

export interface CoreState {
}

const initialState: CoreState = {};

const reducer = createReducer(initialState,
);

export function coreReducer(state: CoreState | undefined, action: Action) {
    return reducer(state, action);
}
