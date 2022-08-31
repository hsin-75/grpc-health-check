import { ProtoGrpcType } from "./proto/health";
import * as protoLoader from "@grpc/proto-loader";
export declare const HEALTH_PROTO_PATH: string;
export declare const defaultOptions: protoLoader.Options;
export declare function getProto<Definition = ProtoGrpcType>(protoPath?: string, options?: protoLoader.Options): NonNullable<Definition>;
