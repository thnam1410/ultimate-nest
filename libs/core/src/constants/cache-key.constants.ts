export enum CacheKeys {
	USER_REFRESH_TOKEN = 'USER_REFRESH_TOKEN',
}

type Operator = {
	toKey: (key: string) => string;
};

export const CacheStorageTransform: Record<CacheKeys, Operator> = {
	[CacheKeys.USER_REFRESH_TOKEN]: {
		toKey: (userId) => `user:${userId}:refresh-token`,
	},
};
