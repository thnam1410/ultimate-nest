import { ReadResponse } from '@libs/proto-schema';
import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { GetUserByIdQuery } from '../impl';
import { AuthDbContextService } from '@libs/orm/prisma-auth';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
	private logger = new Logger(this.constructor.name);
	constructor(private readonly authDbContext: AuthDbContextService) {}

	async execute(query: GetUserByIdQuery): Promise<ReadResponse> {
		this.logger.log(`Async ${query.constructor.name}...`);
		const { request } = query;

		this.logger.log(`Query... ${JSON.stringify(request)}`);
		try {
			const user = await this.authDbContext.user.findFirstOrThrow({
				where: { id: request.userId },
			});

			return { user };
		} catch (error) {
			this.logger.log(error);
			throw new RpcException(error.message);
		}
	}
}
