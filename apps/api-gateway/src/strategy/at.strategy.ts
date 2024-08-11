import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { StrategyType } from '../constants';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppConfigs } from '@libs/common';
import { ConfigService } from '@nestjs/config';

export type JwtPayload = {
	sub: string;
	email: string;
};
@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
	Strategy,
	StrategyType.AccessToken,
) {
	constructor(private readonly configService: ConfigService<AppConfigs>) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get('app.jwt.accessTokenSecret', {
				infer: true,
			}),
		});
	}

	validate(payload: JwtPayload) {
		return payload;
	}
}
