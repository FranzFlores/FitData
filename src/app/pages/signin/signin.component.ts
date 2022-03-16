import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  formLogin: FormGroup;
  user: User = {};

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      email: [this.user.email, Validators.required],
      password: [this.user.password, Validators.required]
    });
  }

  onSubmit() {
    
  }

}
