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
    try {
      const user = await this.userService.create(createUserDto);
      const { password, ...result } = user;
      return user;
    } catch(error) {
      if (error.code === 11000) {
        throw new BadRequestException('Username already was registered previously by other user');
      } else {
        throw new BadRequestException(error.message);
      }
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findOne(loginDto.username);
    if (!user || await bcrypt.compare(loginDto.password, user.password)) {
      throw new UnauthorizedException('Username and/or password incorrects');
    }
    const payload = { username: user.username, sub: user._id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
