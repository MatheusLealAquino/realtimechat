import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ChatsModule } from './modules/chats/chats.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/realtimechat', { 
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
    UsersModule,
    AuthModule,
    ChatsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
