import { HttpException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtSecret } from '@common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret.accessSecret,
    });
  }
  async validate(payload) {
    const { userId, tokenVersion } = payload;
    const blackList = await this.prisma.blacklist.findMany({
      where: { userId },
    });
    if (blackList[0].tokenVersion < tokenVersion) {
      throw new HttpException('已下线，请重新登录！', 401);
    }
    return payload;
  }
}
