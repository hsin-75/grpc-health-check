# gRPC Health Check

An implementation of gRPC health checks, for node.js-based apps that uses `@grpc/grpc-js` as a base.

## Installation

```sh
yarn add git+https://github.com/fonoster/grpc-health-check.git
```

## Dependencies

- [Google Protobuf](https://www.npmjs.com/package/google-protobuf): Protocol Buffers - Google's data
  interchange format.
- [gRPC Boom](https://www.npmjs.com/package/grpc-boom): A zero dependency library to help create
  `gRPC`-friendly error objects.

## Usage

```typescript
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

import { HealthClient, HealthCheckResponse, ProtoGrpcType } from '@fonoster/grpc-health-check';

export class HealthGrpcClient {
  private readonly client: HealthClient;

  constructor({ host, port }: { host: string; port: number }) {
    const packageDefinition = protoLoader.loadSync(path.resolve('@fonoster/grpc-health-check/dist/proto/health.proto'), {
      arrays: true,
      keepCase: true,
      longs: String,
      enums: String,
      objects: true,
      defaults: true,
    });
    const proto = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType;
    this.client = new proto.grpc.health.v1.Health(
      `${host}:${port}`,
      grpc.ChannelCredentials.createInsecure(),
    );
  }

  checkStatus(): Promise<HealthCheckResponse> {
    return new Promise((resolve, reject) => {
      this.client.check(
        { service: 'example' },
        (error?: grpc.ServiceError | null, result?: HealthCheckResponse): void => {
          if (error) {
            reject(error);
          }
          resolve(result || ({} as HealthCheckResponse));
        },
      );
    });
  }

  watchStatus(): grpc.ClientReadableStream<HealthCheckResponse> {
    return this.client.watch({ service: 'example' });
  }
}
```

### Methods

Below is a list of available methods:

#### `check(request, callback)`

Checks the status of the service once.

- `request` - the `HealthCheckRequest` object.
- `callback` (optional) - the callback method.

#### `watch(request)`

Set the initial status of the service and continues to watch for any changes.

- `request` - the `HealthCheckRequest` object.

## Authors

This repository is a clone of [kalos](https://github.com/nicolaspearson/kalos/tree/main/packages/grpc-ts-health-check),
thanks to [Nicolas Pearson](https://github.com/nicolaspearson) for his implementation.

## License

Released under the [MIT License](/LICENSE). Extended from [kalos repository.](https://github.com/nicolaspearson/kalos/blob/main/LICENSE)