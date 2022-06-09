import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PetsListComponent } from './components/pets-list/pets-list.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { PetComponent } from './components/pets-list/pet/pet.component';
import { PetModalComponent } from './components/pets-list/pet-modal/pet-modal.component';
import { LoadingSpinner } from './components/shared/loading-spinner/loading-spinner.component';

//Services
import { PetService } from './services/pet-service/pet.service';
import { AuthGuardService } from './services/user-authentication-serrvice/auth-guard.service';
import { UserAuthenticationService } from './services/user-authentication-serrvice/user-authentication.service';
import { NotificationService } from './services/shared/NotificationService/notification.service';

//NgRx
import { StoreModule } from '@ngrx/store';
import { petInCartCounterReducer } from './store/pet-state.reducer';

//Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddPetComponent } from './components/add-pet/add-pet.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

//Toaster
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignInComponent,
    PetsListComponent,
    AddPetComponent,
    PetComponent,
    PetModalComponent,
    LoadingSpinner,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({ cartCounter: petInCartCounterReducer }),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatChipsModule,
    MatMenuModule,
    MatDividerModule,
    MatSelectModule,
    MatDialogModule,
    MatBadgeModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    UserAuthenticationService,
    AuthGuardService,
    PetService,
    NotificationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
