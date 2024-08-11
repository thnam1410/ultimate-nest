import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import authConfig from '../configs/auth.config';
import appConfig from '../configs/app.config';

@Global()
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [appConfig, authConfig],
			envFilePath: ['.env'],
		}),
	],
	providers: [],
	exports: [],
})
export class CoreModule {}
