import {
	AUTH_SERVICE_NAME,
	ULTIMATE_NEST_ACCOUNT_PACKAGE_NAME,
} from '@libs/proto-schema';

export enum AppService {
	AUTH = 'AUTH',
}

export const SERVICE_LIST = {
	[AppService.AUTH]: {
		package: ULTIMATE_NEST_ACCOUNT_PACKAGE_NAME,
		service: AUTH_SERVICE_NAME,
		protoPath: './proto/auth.proto',
	},
} as const;
