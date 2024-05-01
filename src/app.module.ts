import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
