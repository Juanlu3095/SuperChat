import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageLibService } from '../../../../../message-lib/src/public-api';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  contactForm = new FormGroup({
    nombre: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.minLength(1), Validators.required]
    }),
    apellidos: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.minLength(1), Validators.required]
    }),
    telefono: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.minLength(1), Validators.required]
    }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.minLength(1), Validators.email]
    }),
    contenido: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.minLength(1), Validators.required]
    })
  })

  constructor(private messageService: MessageLibService) {}

  submitForm () {
    if(this.contactForm.valid) {
      const message = {
        nombre: this.contactForm.getRawValue().nombre,
        apellidos: this.contactForm.getRawValue().apellidos,
        telefono: this.contactForm.getRawValue().telefono,
        email: this.contactForm.getRawValue().email,
        contenido: this.contactForm.getRawValue().contenido,
      }
      this.messageService.postMessage(message).subscribe({
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
