import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StrategyType } from '../constants';

@Injectable()
export class RefreshTokenGuard extends AuthGuard(StrategyType.RefreshToken) {}
export const UseRefreshTokenGuard = () => UseGuards(RefreshTokenGuard);
