export const KAFKA_CONFIG = {
	host: process.env.KAFKA_HOST ?? 'localhost:9094',
	services: {
		auth: {
			clientId: 'auth',
			groupId: 'auth',
			name: 'AUTH-KAFKA-CLIENT',
		},
		notification: {
			clientId: 'notification',
			groupId: 'notification',
			name: 'NOTIFICATION-KAFKA-CLIENT',
		},
	},
};
