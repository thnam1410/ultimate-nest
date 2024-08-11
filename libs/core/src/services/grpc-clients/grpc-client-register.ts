import { AppService, SERVICE_LIST } from '@libs/core/constants';
import { ClientsModuleOptions, Transport } from '@nestjs/microservices';

export const generateGrpcClientRegister = (
	services: AppService[],
): ClientsModuleOptions => {
	return services.map((svc) => {
		const { package: _package, protoPath } = SERVICE_LIST[svc];
		return {
			name: svc,
			transport: Transport.GRPC,
			options: { package: _package, protoPath },
		};
	});
};
