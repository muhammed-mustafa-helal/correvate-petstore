import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UserAuthenticationService } from '../../services/user-authentication-serrvice/user-authentication.service';
@Component({
  selector: 'petstore-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnDestroy {
  loginSubscribtion: any;
  constructor(
    private authenticationService: UserAuthenticationService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const username = form.value.username;
    const password = form.value.password;
    this.loginSubscribtion = this.authenticationService
      .loginUser(username, password)
      .subscribe();
    form.reset();
    this.router.navigate(['/explore']);
  }
}
