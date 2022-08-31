import type * as grpc from '@grpc/grpc-js';
import { HealthCheckRequest__Output as HealthCheckRequest } from './proto/grpc/health/v1/HealthCheckRequest';
import { _grpc_health_v1_HealthCheckResponse_ServingStatus as ServingStatus, HealthCheckResponse } from './proto/grpc/health/v1/HealthCheckResponse';
export declare class GrpcHealthCheck {
    private statusMap;
    private watchStatusMap;
    private watchErrorMap;
    constructor(statusMap: {
        [key: string]: ServingStatus;
    });
    private setStatus;
    check(call: grpc.ServerUnaryCall<HealthCheckRequest, HealthCheckResponse>, callback: (error?: grpc.ServiceError, result?: HealthCheckResponse) => void): void;
    watch(call: grpc.ServerWritableStream<HealthCheckRequest, HealthCheckResponse | Error>): void;
}
