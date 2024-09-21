import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { CoreModule } from '@libs/core';
import { Database, OrmModule } from '@libs/orm';
import { JwtModule } from '@nestjs/jwt';

@Module({
	imports: [
		CoreModule,
		AccountModule,
		OrmModule.forRoot({ db: Database.Auth }),
	],
	controllers: [],
	providers: [],
})
export class AuthModule {}
