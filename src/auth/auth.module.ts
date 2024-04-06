import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.auth';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { GoogleStrategy2 } from './google.strategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({
      global: true,
      secret: 'secret-key',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy,
    {
      provide: 'GOOGLE_STRATEGY',
      useClass: GoogleStrategy2,
      useFactory: (options: any) => {
        return new GoogleStrategy2(options);
      },
      inject: ['GOOGLE_OPTIONS'],
    },
    {
      provide: 'GOOGLE_OPTIONS',
      useValue: {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/google-redirect',
        scope: ['email', 'profile'],
      },
    },
  ],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
