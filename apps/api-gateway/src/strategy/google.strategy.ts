import { AppConfigs } from '@libs/common';
import {
	CreateRequest,
	LoginRequest,
	LoginServiceTypes,
} from '@libs/proto-schema';
import {
	Injectable,
	Logger,
	NotImplementedException,
	UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import * as PassportGoogleOAuth2 from 'passport-google-oauth20';
import { VerifyCallback } from 'passport-google-oauth20';
import { AccountService } from '../services/auth/account/account.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(
	PassportGoogleOAuth2.Strategy,
) {
	logger = new Logger(this.constructor.name);

	constructor(
		private readonly configService: ConfigService<AppConfigs>,
		private readonly authService: AccountService,
	) {
		super({
			clientID: configService.get('auth.google.clientID', { infer: true }),
			clientSecret: configService.get('auth.google.clientSecret', {
				infer: true,
			}),
			callbackURL: configService.get('auth.google.callbackURL', {
				infer: true,
			}),
			scope: ['email', 'profile'],
		});
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: any,
		done: VerifyCallback,
	) {
		this.logger.log('Google strategy...');
		if (profile && profile.emails.length > 0) {
			const logCmd: LoginRequest = {
				service: LoginServiceTypes.Google,
				params: {
					accessToken,
					userId: profile.id,
					email: profile.emails[0].value,
					password: undefined,
				},
			};
			const regCmd: CreateRequest = {
				service: LoginServiceTypes.Google,
				tokens: {
					accessToken,
					userId: profile.id,
				},
				email: profile.emails[0].value,
				firstName: profile?.name?.givenName,
				lastName: profile?.name?.familyName,
				password: undefined,
			};
			const user = await this.authService.validateOrCreateUser(logCmd, regCmd);
			if (!user) {
				throw new UnauthorizedException();
			}
			return user;
		}
		throw new NotImplementedException();
	}
}
