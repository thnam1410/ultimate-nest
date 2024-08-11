import { z } from 'zod';

export const GOOGLE_CONFIG_SCHEMA = z.object({
	clientID: z.string().optional(),
	clientSecret: z.string().optional(),
	callbackURL: z.string().optional(),
});
type GOOGLE_CONFIG = z.infer<typeof GOOGLE_CONFIG_SCHEMA>;

export const FACEBOOK_CONFIG_SCHEMA = z.object({
	clientID: z.string().optional(),
	clientSecret: z.string().optional(),
});
type FACEBOOK_CONFIG = z.infer<typeof FACEBOOK_CONFIG_SCHEMA>;

export const JWT_CONFIG_SCHEMA = z.object({
	accessTokenSecret: z.string().optional(),
	accessTokenExpiredIn: z.string().optional(),
	refreshTokenSecret: z.string().optional(),
	refreshTokenExpiredIn: z.string().optional(),
});
type JWT_CONFIG = z.infer<typeof JWT_CONFIG_SCHEMA>;

export const CACHE_CONFIG_SCHEMA = z.object({
	host: z.string().optional(),
	port: z.number({ coerce: true }).optional(),
	ttl: z.number({ coerce: true }).optional(),
});
type CACHE_CONFIG = z.infer<typeof CACHE_CONFIG_SCHEMA>;

type AppConfig = {
	pageUrl: string;
	jwt: JWT_CONFIG;
	cache: CACHE_CONFIG;
};

type AuthConfig = {
	google: GOOGLE_CONFIG;
	facebook: FACEBOOK_CONFIG;
};

export type AppConfigs = {
	app: AppConfig;
	auth: AuthConfig;
};
