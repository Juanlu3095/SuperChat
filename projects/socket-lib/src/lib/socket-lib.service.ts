import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { chatMessage } from '../../../shared-types/src/lib/chatmessage';

@Injectable({
  providedIn: 'root'
})
export class SocketLibService {

  private socket: Socket

  constructor() {
    this.socket = io('http://localhost:3000', {
      withCredentials: true,
      auth: {
        username: sessionStorage.getItem('user_sc') || 'anonymous',
        serverOffset: 0
      }
    }) // Muy importante las credenciales para que socket coja la sesión de Express
  }

  joinRoom(room: string) {
    this.socket.emit('join', room)
  }

  leaveRoom(room: string) {
    this.socket.emit('leave', room)
  }

  sendMessage(message: chatMessage): void {
    this.socket.emit('message', message);
  }

  onMessage(callback: (message: string) => void): void {
    this.socket.on('message', callback);
  }
}
