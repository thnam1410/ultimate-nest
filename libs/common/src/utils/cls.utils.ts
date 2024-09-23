import { ClsServiceManager } from 'nestjs-cls';
import { AppCls } from '../interfaces/cls.interface';
import { RecursiveKeyOf } from 'nestjs-cls/dist/src/types/recursive-key-of.type';

export class ClsUtils {
	static get(key: RecursiveKeyOf<AppCls>) {
		const cls = ClsServiceManager.getClsService<AppCls>();

		return cls.get(key);
	}

	static getId() {
		const cls = ClsServiceManager.getClsService<AppCls>();

		return cls.getId();
	}
}
