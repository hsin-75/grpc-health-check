# gRPC Health Check

An implementation of gRPC health checks, for node.js-based apps that uses `@grpc/grpc-js` as a base.

## Installation

```sh
yarn add git+https://github.com/fonoster/grpc-health-check.git
```

## Usage

```typescript
/**
 * server.ts
 */
import * as grpc from '@grpc/grpc-js';
import { useHealth } from '@fonoster/grpc-health-check';

const server = useHealth(new grpc.Server());

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => server.start());
```

```typescript
/**
 * client.ts
 */
import * as grpc from '@grpc/grpc-js';
import { HealthClient } from '@fonoster/grpc-health-check';

const health = new HealthClient('localhost:50051');

const { status } = await health.check('SERVICE');

console.info('The app is ready to serve!', status);
```

## Authors

This repository is a clone of [kalos](https://github.com/nicolaspearson/kalos/tree/main/packages/grpc-ts-health-check),
thanks to [Nicolas Pearson](https://github.com/nicolaspearson) for his implementation.

## License

Released under the [MIT License](/LICENSE). Extended from [kalos repository.](https://github.com/nicolaspearson/kalos/blob/main/LICENSE)