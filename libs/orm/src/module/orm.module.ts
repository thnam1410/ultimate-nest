import {
	DynamicModule,
	Global,
	InternalServerErrorException,
	Module,
} from '@nestjs/common';
import { AuthDbContextService } from '../prisma-auth/auth-db-context.service';

export enum Database {
	Auth = 'Auth',
}

type OrmModuleOption = {
	db: Database;
};

@Global()
@Module({
	providers: [],
	exports: [],
})
export class OrmModule {
	static forRoot(options: OrmModuleOption): DynamicModule {
		const { db } = options;

		const providers: [] = [];

		switch (db) {
			case Database.Auth:
				providers.push(AuthDbContextService as never);
				break;
			default:
				throw new InternalServerErrorException(`Unknown db type: ${db}`);
		}

		return {
			module: OrmModule,
			providers: providers,
			exports: providers,
		};
	}
}
