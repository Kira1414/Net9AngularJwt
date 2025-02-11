import { Component, inject } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccesoService } from '../../services/acceso.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-register',
  imports: [MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private accessService = inject(AccesoService);
  private router = inject(Router);

  public formBuild = inject(FormBuilder);

  public formRegister: FormGroup = this.formBuild.group({
    name: ['', Validators.required, Validators.email],
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required]
  });

  register() {
    if(this.formRegister.invalid) {
      return;
    }

    const register: User = {
      name: this.formRegister.value.name,
      email: this.formRegister.value.email,
      password: this.formRegister.value.password
    }

    this.accessService.register(register).subscribe({
      next: (resp) => {
        if(resp.isSuccess){
          this.router.navigate(['']);
        }
        else {
          alert('Error al registrar usuario')
        }
      },
      error: (err) => {
        console.log(err.message);
        alert('Error al registrar usuario')
      }
    });
  }

  back() {
    this.router.navigate(['']);
  }

}
