import { Component, inject } from '@angular/core';
import { AccesoService } from '../../services/acceso.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../interfaces/Login';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private accessService = inject(AccesoService);
  private router = inject(Router);

  public formBuild = inject(FormBuilder);

  public formLogin: FormGroup = this.formBuild.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required]
  });

  login() {
    if(this.formLogin.invalid) {
      return;
    }

    const login: Login = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password
    }

    this.accessService.login(login).subscribe({
      next: (resp) => {
        if(resp.isSuccess){
          localStorage.setItem('token', resp.token);
          this.router.navigate(['/products']);
        }
        else {
          alert('Credenciales erroneas')
        }
      },
      error: (err) => {
        console.log(err.message);
        alert('Error al realizar login')
      }
    });
  }

  register() {
    this.router.navigate(['/register']);
  }
}
