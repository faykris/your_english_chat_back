import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { User } from 'src/user/user.schema';
import { LoginDto } from 'src/dtos/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userService.findOne(createUserDto.email);
    if (existingUser) {
      throw new BadRequestException('Email already was registered previously');
    }
    const user = await this.userService.create(createUserDto);
    const { password, ...result } = user;

    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findOne(loginDto.email);
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user._id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}