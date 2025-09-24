import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  contactForm = new FormGroup({
    nombre: new FormControl('', Validators.compose([Validators.min(1), Validators.required])),
    apellidos: new FormControl('', Validators.compose([Validators.min(1), Validators.required])),
    telefono: new FormControl('', Validators.compose([Validators.min(1), Validators.required])),
    email: new FormControl('', Validators.compose([Validators.min(1), Validators.required, Validators.email])),
    contenido: new FormControl('', Validators.compose([Validators.min(1), Validators.required]))
  })
}
