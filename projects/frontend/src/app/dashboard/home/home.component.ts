import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthLibService } from 'auth-lib';
import { SocketLibService } from 'socket-lib';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  messages: {
      id: string,
      user: string,
      content: string
  } [] = []

  // VER https://medium.com/@sehban.alam/integrating-socket-io-with-angular-real-time-awesomeness-made-easy-039dabf97c7a PARA SOCKETS CON ANGULAR & EXPRESS
  // VER https://www.youtube.com/watch?v=vUXL0N1NAUI USA SOCKET.IO-CLIENT
  // Parace que hay que instalar socket.io-client por narices

  chatForm = new FormGroup({
    message: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(1)]
    })
  })

  constructor(private authService: AuthLibService, private socketService: SocketLibService, private router: Router) {}

  logout () {
    this.authService.logout().subscribe({
      next: (respuesta) => {
        this.router.navigate([''])
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  sendMessage () {
    if (this.chatForm.valid) {
      const message = {
        id: Math.floor(Math.random() * 65536).toString(),
        user: 'Prueba',
        content: this.chatForm.getRawValue().message
      }
      console.log("Éste es el mensaje a enviar: " + message.id)
      this.messages.push(message)
      this.socketService.sendMessage(message)
      this.chatForm.reset()
    }
  }
}
