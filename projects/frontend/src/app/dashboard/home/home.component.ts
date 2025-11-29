import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthLibService } from 'auth-lib';
import { SocketLibService } from 'socket-lib';
import { chatMessage } from '../../../../../shared-types/src/lib/chatmessage';
import { ChatmessageLibService } from 'chatmessage-lib';
import { apiresponse } from '../../../../../shared-types/src/lib/apiresponse';
import { chatroom } from '../../../../../shared-types/src/lib/chatroom';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  messages: chatMessage[] = []
  session = sessionStorage.getItem('user_sc')
  userId = this.session ? JSON.parse(this.session).userId : null
  chatRooms: chatroom[] = []
  idChatRoomActual: string = ''

  // VER https://medium.com/@sehban.alam/integrating-socket-io-with-angular-real-time-awesomeness-made-easy-039dabf97c7a PARA SOCKETS CON ANGULAR & EXPRESS
  // VER https://www.youtube.com/watch?v=vUXL0N1NAUI USA SOCKET.IO-CLIENT
  // Parace que hay que instalar socket.io-client por narices

  chatForm = new FormGroup({
    message: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(1)]
    })
  })

  constructor(private authService: AuthLibService, private chatmessagesService: ChatmessageLibService, private socketService: SocketLibService, private router: Router) {}

  ngOnInit(): void {
    this.getChatrooms()

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

  getChatrooms () {
    this.chatmessagesService.getChatrooms().subscribe({
      next: (respuesta: apiresponse<chatroom[]>) => {
        const rooms = respuesta.data.map((room) => {
          if (!room.name) {
            const otherParticipant = room.participants.find((participant) => participant._id !== this.userId)
            return { ...room, name: otherParticipant?.nombre ?? 'Anonymous'}
          }
          return room
        })
        this.chatRooms = rooms
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  getMessagesByRoom (idChatroom: string) {
    this.chatmessagesService.getChatMessages(idChatroom).subscribe({
      next: (respuesta: any) => { // TIPAR ESTO!!
        this.idChatRoomActual = idChatroom
        this.messages = respuesta.data
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  sendMessage () {
    if (this.chatForm.valid && this.session) {
      const fechaActual = new Date()
      const message = {
        userId: JSON.parse(this.session).userId, // Incluir la id del usuario y comprobar si dicha id existe en la base de datos antes de guardar en la colección chatMessages
        username: JSON.parse(this.session).username,
        chatroom: this.idChatRoomActual,
        content: this.chatForm.getRawValue().message,
        order: this.messages.length + 1,
        created_at: `${fechaActual.toLocaleDateString()} ${fechaActual.getHours()}:${fechaActual.getMinutes()}`,
      }
      console.log("Éste es el mensaje a enviar: " + message)
      console.log("Éstos son los nuevos mensajes: ", this.messages)
      this.socketService.sendMessage(message)
      this.chatForm.reset()
    }
  }
}
