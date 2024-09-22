import { ClsStore } from 'nestjs-cls';

export interface AppCls extends ClsStore {
	userId?: string;
}
