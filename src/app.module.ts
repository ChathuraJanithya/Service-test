// app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ClassModule } from './class/class.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, UserModule, ClassModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
