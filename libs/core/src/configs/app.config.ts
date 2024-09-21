import {
	validateConfig,
	AppConfigs,
	JWT_CONFIG_SCHEMA,
	CACHE_CONFIG_SCHEMA,
} from '@libs/common';
import { registerAs } from '@nestjs/config';

export default registerAs<AppConfigs['app']>('app', () => {
	const secretKey =
		process.env.APP_SECRET_KEY ?? 'thjs_js_a_super_str0ng_acc3ss_s3cr3t_k4y';
	const accessTokenSecret =
			process.env.JWT_ACCESS_TOKEN_SECRET ??
			'thjs_js_a_super_str0ng_acc3ss_s3cr3t_k4y',
		accessTokenExpiredIn =
			process.env.JWT_ACCESS_TOKEN_EXPIRE ??
			'thjs_js_a_super_str0ng_r3fr3sh_s3cr3t_k4y',
		refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET ?? '1h',
		refreshTokenExpiredIn = process.env.JWT_REFRESH_TOKEN_EXPIRE ?? '7d';

	const jwt = validateConfig(
		{
			secretKey,
			accessTokenSecret,
			refreshTokenSecret,
			accessTokenExpiredIn,
			refreshTokenExpiredIn,
		} as AppConfigs['app']['jwt'],
		JWT_CONFIG_SCHEMA,
	);

	const redisHost = process.env.REDIS_HOST ?? 'localhost',
		redisPort = process.env.REDIS_PORT ? +process.env.REDIS_PORT : 6379,
		redisDefaultTTL = process.env.REDIS_DEFAULT_TTL;

	const cache = validateConfig(
		{
			host: redisHost,
			port: redisPort,
			ttl: redisDefaultTTL,
		} as AppConfigs['app']['cache'],
		CACHE_CONFIG_SCHEMA,
	);

	return {
		jwt,
		cache,
		pageUrl: process.env.APP_PAGE_URL ?? 'http://localhost:3000/swagger',
	} as AppConfigs['app'];
});
