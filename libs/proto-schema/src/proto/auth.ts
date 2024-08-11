// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.1
//   protoc               v5.27.3
// source: libs/proto-schema/src/proto/auth.proto

/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { wrappers } from "protobufjs";
import { Observable } from "rxjs";

export const protobufPackage = "ultimate.nest.account";

export enum LoginServiceTypes {
  Password = 0,
  Google = 1,
  Facebook = 2,
  Github = 3,
  UNRECOGNIZED = -1,
}

export interface CreateRequest {
  password?: string | undefined;
  email: string;
  firstName: string;
  lastName: string;
  service: LoginServiceTypes;
  tokens: { [key: string]: string };
}

export interface CreateRequest_TokensEntry {
  key: string;
  value: string;
}

export interface CreateResponse {
  activationLink?: string | undefined;
}

export interface ReadRequest {
  userId: string;
}

export interface ReadResponse {
  user: User | undefined;
}

export interface Session {
  id: string;
  email: string;
  /** unix */
  created: number;
  /** unix */
  expires: number;
}

export interface PasswordStruct {
  /** @inject_tag: bson:"hashed,omitempty" */
  hashed: string;
}

export interface AuthServices {
  /** @inject_tag: bson:"password,omitempty" */
  password: PasswordStruct | undefined;
}

export interface User {
  /** @inject_tag: bson:"_id,omitempty" */
  id: string;
  /** @inject_tag: bson:"primaryEmail,omitempty" */
  email: string;
  /** @inject_tag: bson:"firstName,omitempty" */
  firstName: string;
  /** @inject_tag: bson:"lastName,omitempty" */
  lastName: string;
  /** @inject_tag: bson:"createdAt,omitempty" */
  createdAt:
    | Date
    | undefined;
  /** @inject_tag: bson:"updatedAt,omitempty" */
  updatedAt:
    | Date
    | undefined;
  /**
   * @inject_tag: bson:"emails,omitempty"
   * repeated EmailObject emails = 8;
   * @inject_tag: bson:"services,omitempty"
   * AuthServices services = 9;
   * @inject_tag: bson:"settings,omitempty"
   * Settings settings = 10;
   */
  verified: boolean;
}

export interface LoginTypeParams {
  accessToken: string;
  userId: string;
  password?: string | undefined;
  email: string;
}

export interface LoginRequest {
  service: LoginServiceTypes;
  params: LoginTypeParams | undefined;
}

export interface LoginResponse {
  session: Session | undefined;
  user: User | undefined;
}

export interface LogoutRequest {
  sessionId: string;
}

export interface LogoutResponse {
  success: boolean;
}

export const ULTIMATE_NEST_ACCOUNT_PACKAGE_NAME = "ultimate.nest.account";

wrappers[".google.protobuf.Timestamp"] = {
  fromObject(value: Date) {
    return { seconds: value.getTime() / 1000, nanos: (value.getTime() % 1000) * 1e6 };
  },
  toObject(message: { seconds: number; nanos: number }) {
    return new Date(message.seconds * 1000 + message.nanos / 1e6);
  },
} as any;

export interface AuthServiceClient {
  create(request: CreateRequest, metadata?: Metadata): Observable<CreateResponse>;

  read(request: ReadRequest, metadata?: Metadata): Observable<ReadResponse>;

  login(request: LoginRequest, metadata?: Metadata): Observable<LoginResponse>;

  logout(request: LogoutRequest, metadata?: Metadata): Observable<LogoutResponse>;
}

export interface AuthServiceController {
  create(
    request: CreateRequest,
    metadata?: Metadata,
  ): Promise<CreateResponse> | Observable<CreateResponse> | CreateResponse;

  read(request: ReadRequest, metadata?: Metadata): Promise<ReadResponse> | Observable<ReadResponse> | ReadResponse;

  login(request: LoginRequest, metadata?: Metadata): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  logout(
    request: LogoutRequest,
    metadata?: Metadata,
  ): Promise<LogoutResponse> | Observable<LogoutResponse> | LogoutResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["create", "read", "login", "logout"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
