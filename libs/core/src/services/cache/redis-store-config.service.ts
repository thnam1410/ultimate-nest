import { AppConfigs } from '@libs/common';
import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';

@Injectable()
export class RedisStoreConfigService implements CacheOptionsFactory {
	constructor(private readonly configService: ConfigService<AppConfigs>) {}

	async createCacheOptions(): Promise<CacheModuleOptions> {
		const { host, port, ttl } = this.configService.get('app.cache', {
			infer: true,
		})!;

		return {
			store: await redisStore({
				ttl,
				socket: { host, port },
			}),
		};
	}
}
