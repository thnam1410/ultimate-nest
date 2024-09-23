import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppConfigs } from '@libs/common';
import { JwtModule } from '@nestjs/jwt';
import appConfig from '../configs/app.config';
import authConfig from '../configs/auth.config';
import { AppClsModule, AppLoggerModule } from '../services';

@Global()
@Module({
	imports: [
		AppClsModule,
		AppLoggerModule,
		ConfigModule.forRoot({
			isGlobal: true,
			load: [appConfig, authConfig],
			envFilePath: ['.env'],
		}),
		JwtModule.registerAsync({
			global: true,
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService<AppConfigs>) => {
				return {
					secret: configService.get('app.jwt.secretKey', {
						infer: true,
					}),
				};
			},
		}),
	],
	providers: [],
	exports: [],
})
export class CoreModule {}
