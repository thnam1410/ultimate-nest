import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccountModule } from './account/account.module';
import { CoreModule } from '@libs/core';
import { Database, OrmModule } from '@libs/orm';
import { JwtModule } from '@nestjs/jwt';

@Module({
	imports: [
		CoreModule,
		AccountModule,
		OrmModule.forRoot({ db: Database.Auth }),
		JwtModule.register({ global: true }),
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
