import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthLibService } from 'auth-lib';
import { SocketLibService } from 'socket-lib';
import { chatMessage } from '../../../../../shared-types/src/lib/chatmessage';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  messages: chatMessage[] = []
  session = sessionStorage.getItem('user_sc')

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

  ngOnInit(): void {
    this.socketService.onMessage((message: any) => {
      console.log("Nuevo mensaje: " + JSON.stringify(message))
      this.messages.push(message)
    })
  }

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
    if (this.chatForm.valid && this.session) {
      const message = {
        user: this.session, // Incluir la id del usuario y comprobar si dicha id existe en la base de datos antes de guardar en la colección chatMessages
        content: this.chatForm.getRawValue().message
      }
      console.log("Éste es el mensaje a enviar: " + message)
      this.socketService.sendMessage(message)
      this.chatForm.reset()
    }
  }
}
