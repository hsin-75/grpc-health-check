/*
 * Copyright (C) 2022 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/fonos
 *
 * This file is part of Fonoster
 *
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 *    https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as grpc from "@grpc/grpc-js";
import { HealthClient as Client } from "./proto/grpc/health/v1/Health";
import { HealthCheckResponse__Output as HealthCheckResponse } from "./proto/grpc/health/v1/HealthCheckResponse";
import { getProto } from "./proto-definition";

export class HealthClient {
  private readonly client: Client;

  public constructor(address: string, credentials: grpc.ChannelCredentials) {
    const proto = getProto();

    this.client = new proto.grpc.health.v1.Health(address, credentials);
  }

  public async check(service: string): Promise<HealthCheckResponse> {
    return new Promise((resolve, reject) => {
      this.client.check(
        { service },
        (err?: grpc.ServiceError | null, res?: HealthCheckResponse): void => {
          if (err) return reject(err);

          resolve(res || ({} as HealthCheckResponse));
        }
      );
    });
  }

  public watch(
    service: string
  ): grpc.ClientReadableStream<HealthCheckResponse> {
    return this.client.watch({ service });
  }
}
