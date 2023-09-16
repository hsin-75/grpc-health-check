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
import { getLogger } from "@fonoster/logger"
import { HealthClient } from "./health-client";

const logger = getLogger({ service: "grpc-health-check", filePath: __filename })

export async function checker(service: string, address: string) {
  const health = new HealthClient(address);

  try {
    const { status } = await health.check(service);

    logger.verbose(
      `healthcheck success [status: ${status}]`
    );

    process.exit(0);
  } catch (error) {
    logger.error(
      `healthcheck failed: ${error}`,
      error
    );

    process.exit(1);
  }
}
