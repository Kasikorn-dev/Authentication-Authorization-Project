import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_KEY, // คีย์ลับสำหรับ JWT
      signOptions: { expiresIn: '1h' }, // Token มีอายุ 1 ชั่วโมง
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
