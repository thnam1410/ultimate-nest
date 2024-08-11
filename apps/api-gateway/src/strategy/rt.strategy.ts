import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { StrategyType } from '../constants';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppConfigs } from '@libs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
	Strategy,
	StrategyType.RefreshToken,
) {
	constructor(private readonly configService: ConfigService<AppConfigs>) {
		super({
			passReqToCallback: true,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get('app.jwt.refreshTokenSecret', {
				infer: true,
			}),
		});
	}

	validate(req: Request, payload: any) {
		const refreshToken = req
			.get('Authorization')
			?.replace('Bearer', '')
			?.trim();

		return { ...payload, refreshToken };
	}
}
