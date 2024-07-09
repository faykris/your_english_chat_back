import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { SocketsModule } from 'src/sockets/sockets.module';
require('dotenv').config();

@Module({
  imports: [
    UserModule,
    SocketsModule,
    JwtModule.register({
      global: true,
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: `${process.env.JWT_EXPIRATION}` },
    }),
  ],
  providers: [AuthService, UserService],
  controllers: [AuthController]
})
export class AuthModule {}
