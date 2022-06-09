import { Action } from '@ngrx/store';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export class AddToCart implements Action {
  readonly type = ADD_TO_CART;
}

export class RemoveFromCart implements Action {
  readonly type = REMOVE_FROM_CART;
}
