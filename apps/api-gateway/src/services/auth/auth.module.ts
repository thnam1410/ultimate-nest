import { AppCacheModule, CacheManagerService, GrpcModule } from '@libs/core';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import {
	AccessTokenStrategy,
	FacebookStrategy,
	GoogleStrategy,
	RefreshTokenStrategy,
} from '../../strategy';
import { AccountService } from './account/account.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CqrsModule } from '@nestjs/cqrs';

const strategies = [
	GoogleStrategy,
	FacebookStrategy,
	AccessTokenStrategy,
	RefreshTokenStrategy,
];
@Module({
	imports: [
		CqrsModule,
		PassportModule,
		GrpcModule,
		AppCacheModule.registerAsync({ type: 'redis' }),
	],
	controllers: [AuthController],
	providers: [...strategies, AuthService, AccountService, CacheManagerService],
})
export class AuthModule {}
