import { 
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer, 
  OnGatewayInit, 
  OnGatewayConnection, 
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chats.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class ChatsGateway {
  constructor(
    private readonly chatsService : ChatService,
  ) {}

  @WebSocketServer() 
  private server: Server;

  private clients: Array<string> = [];
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): void {
    this.logger.log('---------------------------------- Inicio');
    this.logger.log(client.id);
    this.logger.log('---------------------------------- Fim');

    const chatId = payload.id;
    const data = {
      userId: payload.user,
      date: new Date(),
      message: payload.message
    }

    this.chatsService.updateChat(chatId, data).then(response => {
      this.server.emit(chatId, {
        message: data.message,
        userId: payload.user
      });
    }).catch(err => {
      this.logger.error(err);
    });
  }
}
