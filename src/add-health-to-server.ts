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
import { _grpc_health_v1_HealthCheckResponse_ServingStatus as ServingStatus } from "./proto/grpc/health/v1/HealthCheckResponse";
import { HealthCheck } from "./health-service";
import { getProto } from "./proto-definition";
import logger from "@fonoster/logger";

/**
 * Add the health service to your existing server.
 *
 * @param {grpc.Server} server - Application server.
 */
export function useHealth(server: grpc.Server, proto = getProto()) {
  const statusMap = {
    "": ServingStatus.SERVING,
  };

  const service = new HealthCheck(
    statusMap
  ) as unknown as grpc.UntypedServiceImplementation;

  server.addService(proto.grpc.health.v1.Health.service, service);
  logger.info("added healthcheck service from @fonoster/grpc-health-check");

  return server;
}
