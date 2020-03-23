import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chats.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  constructor(
    private readonly chatsService : ChatService,
  ) {}

  @WebSocketServer() 
  server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): void {
    this.logger.log('Chegou mensagem');
    this.logger.log(client.id);
    this.logger.log(payload.message);

    const chatId = payload.id;
    const data = {
      userId: payload.user,
      message: payload.message,
      date: new Date()
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

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    client.removeAllListeners();
    this.logger.log(`Client connected: ${client.id}`);
  }
}
