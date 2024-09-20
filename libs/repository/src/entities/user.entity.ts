import { BaseEntity } from './base.entity';
import { AuthServiceTypes } from '@libs/contracts';

export class UserEntity extends BaseEntity<string> {
	email: string;
	firstName: string;
	lastName: string;
	verified: boolean;
	authService: AuthServiceTypes;
}
