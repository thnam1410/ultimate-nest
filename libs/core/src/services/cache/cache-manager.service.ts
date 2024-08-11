import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CacheManagerService {
	constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

	async get<T>(key: string) {
		return this.cacheManager.get<T>(key);
	}

	async set<T>(key: string, value: T, ttl?: number) {
		return this.cacheManager.set(key, value, ttl);
	}
}
