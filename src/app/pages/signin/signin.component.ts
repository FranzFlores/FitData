import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  formLogin: FormGroup;
  user: User = {};

  constructor(
    private formBuilder: FormBuilder,
    private authservice: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, Validators.required]
    });
  }

  get fl() { return this.formLogin.controls }

  onSubmit() {

    this.authservice.signin(this.fl['email'].value, this.fl['password'].value).pipe(first())
      .subscribe({
        next: data => {
          this.router.navigate(['manager']);
        },
        error: err => {
          if (err.status === 400) {
            this.snackBar.open("La contraseña es incorrecta", null, { duration: 3000 });
          } else if (err.status === 401) {
            this.snackBar.open("El usuario no está registrado", null, { duration: 3000 });
          }
        }
      });

  }

}
