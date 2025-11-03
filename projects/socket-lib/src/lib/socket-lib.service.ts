import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { chatMessage } from '../../../shared-types/src/lib/chatmessage';

@Injectable({
  providedIn: 'root'
})
export class SocketLibService {

  private socket: Socket

  constructor() {
    this.socket = io('http://localhost:3000')
  }

  sendMessage(message: chatMessage): void {
    this.socket.emit('message', message);
  }

  onMessage(callback: (message: string) => void): void {
    this.socket.on('message', callback);
  }
}
