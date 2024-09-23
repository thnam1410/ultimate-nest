import { ClsUtils } from '@libs/common/utils/cls.utils';
import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { pino } from 'pino';

const isProduction = process.env.NODE_ENV === 'production';
@Module({
	imports: [
		LoggerModule.forRoot({
			pinoHttp: {
				timestamp: pino.stdTimeFunctions.isoTime,
				autoLogging: false,
				quietReqLogger: true,
				genReqId: () => {
					return ClsUtils.getId();
				},
				formatters: {
					bindings: (bindings) => {
						return {};
					},
					level: (label) => {
						return { level: label.toUpperCase() };
					},
				},
			},
		}),
	],
	providers: [],
})
export class AppLoggerModule {}
