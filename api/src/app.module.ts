import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppController } from './app.controller';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/realtimechat', { useNewUrlParser: true, useUnifiedTopology: true }),
    UsersModule,
    AuthModule,
    ChatModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
