import { Injectable, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from './secret/jwt.secret';

type JwtExpiresIn = `${number}s` | `${number}m` | `${number}h` | `${number}d`;

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async getAccessTokens(userId: string, accessTime: JwtExpiresIn = '15m') {
    const accessToken = this.jwtService.sign(
      { userId },
      {
        secret: jwtSecret.accessSecret,
        expiresIn: accessTime,
      },
    );
    return { accessToken };
  }

  async getRefreshTokens(userId: string, refreshTime: JwtExpiresIn = '7d') {
    const refreshToken = this.jwtService.sign(
      { userId },
      {
        secret: jwtSecret.refreshSecret,
        expiresIn: refreshTime,
      },
    );
    return { refreshToken };
  }

  async login(user) {
    const { userId } = user;

    return {
      code: 200,
      message: '登录成功',
      tokens: {
        ...(await this.getAccessTokens(userId)),
        ...(await this.getRefreshTokens(userId)),
      },
      data: [user],
    };
  }
}
