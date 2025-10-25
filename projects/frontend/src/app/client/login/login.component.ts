import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthLibService } from 'auth-lib';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.minLength(1), Validators.email]
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.minLength(1), Validators.required]
    })
  })

  constructor(private router: Router, private authService: AuthLibService) {}

  login() {
    if (this.loginForm.valid) {
      const loginInput = {
        email: this.loginForm.getRawValue().email,
        password: this.loginForm.getRawValue().password
      }
      this.authService.login(loginInput).subscribe({
        next: (respuesta) => {
          this.router.navigate(['/dashboard'])
        },
        error: (error) => {
          console.error(error)
        }
      })
    }
  }
}
