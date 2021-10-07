import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {UserRepository} from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(UserRepository) private repository:UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: 'area51',
    });
  }

  async validate(payload: any) {
    const username = payload.username;
    const user = await this.repository.find({username});

    if (!user) {
        throw new UnauthorizedException('User not Authorized');
    }

    return user;
    
  }
}