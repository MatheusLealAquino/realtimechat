import { Module } from '@nestjs/common';
import { ChatService } from './chats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from './schema/chat.schema';
import { ChatsController } from './chats.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Chat', schema: ChatSchema}]),
    UsersModule
  ],
  controllers: [ChatsController],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatsModule {}
