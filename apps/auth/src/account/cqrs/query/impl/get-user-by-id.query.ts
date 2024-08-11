import { ReadRequest } from '@libs/proto-schema';
import { IQuery } from '@nestjs/cqrs';

export class GetUserByIdQuery implements IQuery {
	constructor(public readonly request: ReadRequest) {}
}
