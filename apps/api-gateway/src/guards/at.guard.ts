import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StrategyType } from '../constants';

@Injectable()
export class AccessTokenGuard extends AuthGuard(StrategyType.AccessToken) {}
export const UseAppGuard = () => UseGuards(AccessTokenGuard);
