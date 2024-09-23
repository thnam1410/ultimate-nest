import { Module } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ClsModule } from 'nestjs-cls';

@Module({
	imports: [
		ClsModule.forRoot({
			global: true,
			middleware: {
				// automatically mount the
				// ClsMiddleware for all routes
				mount: true,
				// and use the setup method to
				// provide default store values.
				setup: (cls, req) => {
					cls.set('userId', req.headers['x-user-id']);
				},
				generateId: true,
				idGenerator: (req) => {
					const reqId =
						req.headers['x-request-id'] ?? randomUUID().split('-')[4];

					return reqId;
				},
			},
		}),
	],
	providers: [],
})
export class AppClsModule {}
