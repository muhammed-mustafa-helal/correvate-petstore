import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

import { Pet, PetStatusEnum } from '../../../models/pet.model';
import { Store } from '@ngrx/store';

import * as PetActions from '../../../store/pet-state.actions';
/**
 * @title Dialog elements
 */
@Component({
  selector: 'petstore-pet-modal',
  templateUrl: 'pet-modal.component.html',
  styleUrls: ['pet-modal.component.scss'],
})
export class PetModalComponent {
  pet!: Pet;
  PetStatusEnum = PetStatusEnum;

  constructor(
    @Inject(MAT_DIALOG_DATA) public petData: any,
    private store: Store<{ cartCounter: { petsInCartCounter: number } }>
  ) {
    this.pet = petData.pet;
  }

  addToCart() {
    this.pet.addedToCart = true;
    this.store.dispatch(new PetActions.AddToCart());
  }
  removeFromCart() {
    this.pet.addedToCart = false;
    this.store.dispatch(new PetActions.RemoveFromCart());
  }
}
