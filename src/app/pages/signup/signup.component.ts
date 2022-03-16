import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  formRegister: FormGroup;
  user: User = {};
  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.formRegister = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, Validators.required],
      password:[this.user.password, Validators.required],
      height: [this.user.height, Validators.required]
    });
  }

  onSubmit() {
    console.log(this.formRegister.value);
    this.userService.signup(this.formRegister.value).subscribe(result => {
       this.snackBar.open('Se ha registrado el usuario correctamente');
       this.formRegister.reset();
       //Redirigir a inicio de sesión
    },error=>{
      console.log(error);
      this.snackBar.open('Ha ocurrido un error al registrar usuario');
    });
  }

  onCancel() {

  }


}
