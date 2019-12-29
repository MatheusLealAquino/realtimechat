import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
