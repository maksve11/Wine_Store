import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { CreateUserDTO } from '../user/dto/createuser.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  User as FirebaseUser,
} from 'firebase/auth';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new NotAcceptableException('could not find the user');
    }

    if (user && isPasswordValid) {
      return user;
    }

    return null;
  }

  async login(loginDto: LoginDTO) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const payload = { email: user.email, sub: user.id, role: user.role.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async registration(userDto: LoginDTO) {
    const guest = await this.usersService.findByEmail(userDto.email);
    if (guest) {
      throw new UnauthorizedException('User already exists');
    }
    const hashPassword = await bcrypt.hash(userDto.password, 10);
    const newUserDto = new CreateUserDTO(userDto.email, hashPassword, 1);
    const newUser = await this.usersService.createUser(newUserDto);
    const payload = { email: newUser.email, sub: newUser.id, role: 'Admin' };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async validateGoogleUser(profile: any): Promise<User> {
    const user = await this.usersService.findOrCreateGoogleUser(
      profile.email,
      profile.displayName,
      profile.photos[0].value,
    );
    return user;
  }
}