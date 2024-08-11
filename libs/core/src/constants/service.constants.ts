import {
	AUTH_SERVICE_NAME,
	ULTIMATE_NEST_ACCOUNT_PACKAGE_NAME,
} from '@libs/proto-schema';

const BASE_URL = process.cwd() + '';

export enum AppService {
	AUTH = 'AUTH',
}

export const SERVICE_LIST = {
	[AppService.AUTH]: {
		package: ULTIMATE_NEST_ACCOUNT_PACKAGE_NAME,
		service: AUTH_SERVICE_NAME,
		protoPath: BASE_URL + '/libs/proto-schema/src/proto/auth.proto',
	},
} as const;
