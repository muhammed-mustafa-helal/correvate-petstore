import { Component, OnInit, Input } from '@angular/core';

import { PetModalComponent } from './../pet-modal/pet-modal.component';
import { MatDialog } from '@angular/material/dialog';

import { Pet } from '../../../models/pet.model';

@Component({
  selector: 'petstore-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss'],
})
export class PetComponent implements OnInit {
  @Input() pet!: Pet;

  constructor(private petModalRef: MatDialog) {}

  ngOnInit(): void {
    this.pet.addedToCart = false;
  }

  openModal() {
    this.petModalRef.open(PetModalComponent, {
      data: {
        pet: this.pet,
      },
    });
  }
}
