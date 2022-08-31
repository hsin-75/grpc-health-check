import * as grpc from "@grpc/grpc-js";
export declare function useHealth(server: grpc.Server, proto?: import("./proto/health").ProtoGrpcType): grpc.Server;
