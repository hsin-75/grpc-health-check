import * as grpc from "@grpc/grpc-js";
export declare type Options = {
    address: string;
    credentials: grpc.ChannelCredentials;
};
export declare function checker(service: string, options: Options): Promise<void>;
