import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chats.service';

@WebSocketGateway()
export class ChatsGateway {
  constructor(
    private readonly chatsService : ChatService,
  ) {}

  @WebSocketServer() 
  server: Server;

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): void {
    const chatId = payload.id;
    const data = {
      userId: payload.user,
      message: payload.message,
      date: new Date()
    }

    this.chatsService.updateChat(chatId, data).then(() => {
      this.server.emit(chatId, data.message);
    });
  }
}
