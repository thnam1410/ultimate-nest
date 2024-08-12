import { CacheModule, CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { DynamicModule, Module } from '@nestjs/common';
import { RedisStoreConfigService } from './redis-store-config.service';
import { CacheManagerService } from './cache-manager.service';

type AppCacheRegisterOptions = {
	type: 'redis';
};

@Module({})
export class AppCacheModule {
	static registerAsync(options: AppCacheRegisterOptions): DynamicModule {
		let module = CacheModule.registerAsync({});

		switch (options.type) {
			case 'redis':
				module = CacheModule.registerAsync({
					useClass: RedisStoreConfigService,
				});
				break;
			default:
				break;
		}

		return {
			module: AppCacheModule,
			imports: [module],
			providers: [CacheManagerService],
			exports: [CacheManagerService, module],
		};
	}
}
