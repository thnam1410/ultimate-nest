import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/db-auth';

@Injectable()
export class AuthDbContextService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	async onModuleInit() {
		await this.$connect();
	}
	async onModuleDestroy() {
		await this.$disconnect();
	}
}
