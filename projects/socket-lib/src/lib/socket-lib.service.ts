import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';

interface message {
    id: string,
    user: string,
    content: string
  }

@Injectable({
  providedIn: 'root'
})
export class SocketLibService {

  private socket: Socket

  constructor() {
    this.socket = io('http://localhost:3000')
  }

  sendMessage(message: message): void {
    this.socket.emit('message', message);
  }

  onMessage(callback: (message: string) => void): void {
    this.socket.on('message', callback);
  }
}
