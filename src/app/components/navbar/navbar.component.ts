import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import { UserAuthenticationService } from 'src/app/services/user-authentication-serrvice/user-authentication.service';

import { Store } from '@ngrx/store';

@Component({
  selector: 'petstore-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnDestroy {
  isChecked: boolean = false;
  cartItemsCounter: number = 0;
  mode: string = 'nightlight_round';
  logoutSubscribtion: any;

  constructor(
    private authenticationService: UserAuthenticationService,
    private router: Router,
    private store: Store<{ cartCounter: { petsInCartCounter: number } }>
  ) {}

  ngOnInit(): void {
    //Angular and Ngrx unscubscribe from the store when the component is destroyed so there is no need to store the subscription and destroy it later.
    this.store.select('cartCounter').subscribe((state) => {
      this.cartItemsCounter = state.petsInCartCounter;
    });
  }

  ngOnDestroy(): void {
    this.logoutSubscribtion.unscubscribe();
  }

  logoutUser() {
    this.logoutSubscribtion = this.authenticationService
      .logoutUser()
      .subscribe();
    this.router.navigate(['/signin']);
  }

  changeTheme(event: MatSlideToggleChange): void {
    this.mode = event.checked ? 'nightlight_round' : 'light_mode';
    document.body.classList.toggle('darkMode');
  }
}
