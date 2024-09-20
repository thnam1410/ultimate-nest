import { AppService, SERVICE_LIST } from '@libs/core/constants';
import { ClientsModuleOptions, Transport } from '@nestjs/microservices';

export const generateGrpcClientRegister = (
	services: AppService[],
): ClientsModuleOptions => {
	return services.map((svc) => {
		const { package: _package, protoPath } = SERVICE_LIST[svc];

		const svcEnvUrl = `${svc}_GRPC_URL`;
		const url =
			process.env.NODE_ENV === 'production'
				? process.env?.[svcEnvUrl]
				: '0.0.0.0:50051';

		console.log(`GRPC ${svc} url:`, url);

		return {
			name: svc,
			transport: Transport.GRPC,
			options: {
				package: _package,
				protoPath,
				url,
			},
		};
	});
};
