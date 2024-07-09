import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClassroomModule } from './classroom/classroom.module';
import { ClassroomService } from './classroom/classroom.service';
import { SocketsModule } from './sockets/sockets.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return { uri: configService.get('MONGO_URI') }
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    ClassroomModule,
    SocketsModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService, ClassroomService],
})
export class AppModule {}
