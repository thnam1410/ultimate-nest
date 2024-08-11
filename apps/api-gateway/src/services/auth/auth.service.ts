import {
	ForbiddenException,
	Injectable,
	Logger,
	UnauthorizedException,
} from '@nestjs/common';
import { IssueTokenRequest } from './auth.dto';
import { AccountService } from './account/account.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@libs/proto-schema';
import { ConfigService } from '@nestjs/config';
import { AppConfigs } from '@libs/common';
import { JwtPayload } from '../../strategy';
import { CacheManagerService } from '@libs/core';
import { CacheStorageTransform } from '@libs/core/constants/cache-key.constants';

@Injectable()
export class AuthService {
	private readonly logger = new Logger(this.constructor.name);

	constructor(
		private readonly configService: ConfigService<AppConfigs>,
		private readonly accountService: AccountService,
		private readonly jwtService: JwtService,
		private readonly cacheManager: CacheManagerService,
	) {}

	async issueTokens(payload: IssueTokenRequest) {
		const user = await this.getUserOrThrow(payload.userId);
		return await this.getTokens(user.id, this.toJwtPayload(user));
	}

	async refreshToken(userId: string, refreshToken?: string) {
		if (!refreshToken) {
			this.logger.error('Refresh token not found in payload!');
			throw new ForbiddenException('Refresh token not found!');
		}

		const user = await this.getUserOrThrow(userId);

		const { toKey } = CacheStorageTransform.USER_REFRESH_TOKEN;
		const savedRefreshToken = await this.cacheManager.get<string>(
			toKey(userId),
		);
		this.logger.debug('Key: ', toKey(userId));
		this.logger.debug('RefreshToken: ', savedRefreshToken);

		if (!user || !savedRefreshToken) {
			this.logger.error('User or saved refresh token not found!');
			throw new ForbiddenException('Access Denied');
		}

		try {
			await this.jwtService.verifyAsync<JwtPayload>(refreshToken, {
				secret: this.configService.get('app.jwt.refreshTokenSecret', {
					infer: true,
				}),
			});

			return await this.getTokens(userId, this.toJwtPayload(user));
		} catch (error) {
			throw new UnauthorizedException('Unable to verify or generate tokens!');
		}
	}

	private toJwtPayload(user: User): JwtPayload {
		return {
			sub: user.id,
			email: user.email,
		};
	}

	private async getTokens(userId: string, payload: Record<string, any>) {
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(payload, {
				secret: this.configService.get('app.jwt.accessTokenSecret', {
					infer: true,
				}),
				expiresIn: this.configService.get('app.jwt.accessTokenExpiredIn', {
					infer: true,
				}),
			}),
			this.jwtService.signAsync(payload, {
				secret: this.configService.get('app.jwt.refreshTokenSecret', {
					infer: true,
				}),
				expiresIn: this.configService.get('app.jwt.accessTokenExpiredIn', {
					infer: true,
				}),
			}),
		]);

		const { toKey } = CacheStorageTransform.USER_REFRESH_TOKEN;
		await this.cacheManager.set(toKey(userId), refreshToken);

		return {
			accessToken,
			refreshToken,
		};
	}

	private async getUserOrThrow(userId: string) {
		const { user } = await this.accountService.getUser({
			userId,
		});

		if (!user) {
			throw new UnauthorizedException('User not found!');
		}

		return user;
	}
}
