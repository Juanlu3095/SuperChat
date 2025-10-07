import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthLibService } from 'auth-lib'

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm = new FormGroup({
    nombre: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.minLength(1), Validators.required]
    }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.minLength(1), Validators.email]
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.minLength(1), Validators.required]
    }),
    password_confirmation: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.minLength(1), Validators.required]
    })
  })

  constructor(private authService: AuthLibService) {}

  createUser () {
    if (this.registerForm.valid) {
      const newUser = {
        nombre: this.registerForm.getRawValue().nombre,
        email: this.registerForm.getRawValue().email,
        password: this.registerForm.getRawValue().password
      }
      this.authService.register(newUser).subscribe({
        next: (respuesta) => {
          console.log(respuesta)
        },
        error: (error) => {
          console.error(error)
        }
      })
    }
  }
}
