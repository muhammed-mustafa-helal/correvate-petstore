import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddPetComponent } from './components/add-pet/add-pet.component';
import { PetsListComponent } from './components/pets-list/pets-list.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

import { AuthGuardService } from './services/user-authentication-serrvice/auth-guard.service';

const routes: Routes = [
  { path: '', canActivate: [AuthGuardService], component: PetsListComponent },
  { path: 'signin', component: SignInComponent },
  {
    path: 'explore',
    canActivate: [AuthGuardService],
    component: PetsListComponent,
  },
  {
    path: 'addpet',
    canActivate: [AuthGuardService],
    component: AddPetComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
