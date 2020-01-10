import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { ChatsModule } from '../chats/chats.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema}]),
    forwardRef(() => ChatsModule)
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})

export class UsersModule {}
