import { Component, OnInit, OnDestroy } from '@angular/core';

import { PetService } from '../../services/pet-service/pet.service';

import { Pet, PetStatusEnum } from '../../models/pet.model';
@Component({
  selector: 'petstore-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.scss'],
})
export class PetsListComponent implements OnInit, OnDestroy {
  pets: Pet[] = [];
  filteredPets: Pet[] = [];
  petStatus: string = '';
  isLoading: boolean = false;

  fetchPetsSubscribtion: any;

  readonly petStatusEnum = PetStatusEnum;

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.fetchAllPets();
  }

  ngOnDestroy(): void {
    this.fetchPetsSubscribtion.unscubscribe();
  }

  fetchAllPets() {
    this.isLoading = true;
    this.fetchPetsSubscribtion = this.petService
      .fetchAllPets()
      .subscribe((pets) => {
        this.pets = pets;
        this.filteredPets = pets;
      });
    this.isLoading = false;
  }

  fetchPetsByStatus(status: string) {
    this.isLoading = true;
    this.petStatus = status;
    const filteredPets = this.pets.filter((pet) => pet.status === status);
    this.filteredPets = filteredPets;
    this.isLoading = false;
  }
}
