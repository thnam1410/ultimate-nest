import * as Express from 'express';
import { UserReq } from '../interfaces';
import { BadRequestException } from '@nestjs/common';
import * as _ from 'lodash';

export const userFromRequest = (req: Express.Request): UserReq => {
	if (!req.user) {
		throw new BadRequestException('User not found from request!');
	}

	//@ts-ignore
	return { id: _.get(req.user, 'sub')!, ..._.omit(req.user, 'sub') };
};
