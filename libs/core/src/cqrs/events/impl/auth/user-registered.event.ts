import { UserEntity } from '@libs/repository';
import { IEvent } from '@nestjs/cqrs';

export type UserRegisteredEventPayload = UserEntity & {
	activationLink?: string;
};
export class UserRegisteredEvent implements IEvent {
	constructor(public readonly payload: UserRegisteredEventPayload) {}
}
