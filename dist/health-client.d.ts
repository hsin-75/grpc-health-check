import * as grpc from "@grpc/grpc-js";
import { HealthCheckResponse__Output as HealthCheckResponse } from "./proto/grpc/health/v1/HealthCheckResponse";
export declare class HealthClient {
    private readonly client;
    constructor(address: string);
    check(service: string): Promise<HealthCheckResponse>;
    watch(service: string): grpc.ClientReadableStream<HealthCheckResponse>;
}
