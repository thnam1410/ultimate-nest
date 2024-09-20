import { AggregateRoot } from '@nestjs/cqrs';

export abstract class BaseEntity<TId extends string | number = string> {
	id: TId;

	createdAt?: Date;
	updatedAt?: Date;
	archivedAt?: boolean;
}
