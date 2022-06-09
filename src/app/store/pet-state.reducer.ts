import { Action } from '@ngrx/store';

import * as PetActions from './pet-state.actions';

const initialState = {
  petsInCartCounter: 0,
};

export function petInCartCounterReducer(state = initialState, action: Action) {
  switch (action.type) {
    case PetActions.ADD_TO_CART:
      return {
        ...state,
        petsInCartCounter: state.petsInCartCounter + 1,
      };
    case PetActions.REMOVE_FROM_CART:
      return {
        ...state,
        petsInCartCounter: state.petsInCartCounter - 1,
      };
    default:
      return state;
  }
}
