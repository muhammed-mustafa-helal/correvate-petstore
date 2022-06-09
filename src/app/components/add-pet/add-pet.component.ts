import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  ValidationErrors,
} from '@angular/forms';

import { PetService } from '../../services/pet-service/pet.service';

import { PetStatusEnum } from '../../models/pet.model';

@Component({
  selector: 'petstore-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.scss'],
})
export class AddPetComponent {
  petForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    status: ['', Validators.required],
    image: [
      '',
      Validators.required,
      async (control: AbstractControl): Promise<ValidationErrors | null> =>
        ['image/png', 'image/jpeg'].includes(control.value.type)
          ? null
          : {
              invalidType: control.value.type,
            },
    ],
  });

  readonly petStatusEnum = Object.values(PetStatusEnum);

  get name() {
    return this.petForm.get('name');
  }
  get status() {
    return this.petForm.get('status');
  }
  get image() {
    return this.petForm.get('image');
  }

  constructor(
    private fb: FormBuilder,
    private petService: PetService,
    private router: Router
  ) {}

  fileChanged(e: Event) {
    this.petForm.patchValue({
      image: Array.from((e.target as HTMLInputElement).files || [])[0],
    });
  }

  onSubmit() {
    this.petService.addPet(this.petForm.value);
    this.router.navigate(['/explore']);
  }
}
