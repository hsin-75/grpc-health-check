/*
 * Copyright (C) 2022 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/fonos
 *
 * This file is part of Project Fonos
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
import path from "path";
import { ProtoGrpcType } from "./proto/health";
import * as protoLoader from "@grpc/proto-loader";

export const HEALTH_PROTO_PATH = path.resolve(
  `${__dirname}/proto/health.proto`
);

export const defaultOptions: protoLoader.Options = {
  arrays: true,
  keepCase: true,
  longs: String,
  enums: String,
  objects: true,
  defaults: true,
};

/**
 * Gets the proto definition.
 *
 * @param {string} protoPath - The path of proto file to load.
 * @return {Definition} The proto definition.
 */
export function getProto<Definition = ProtoGrpcType>(
  protoPath: string = HEALTH_PROTO_PATH,
  options: protoLoader.Options = defaultOptions
) {
  const definitions = protoLoader.loadSync(protoPath, options);

  const proto = grpc.loadPackageDefinition(
    definitions
  ) as unknown as Definition;

  if (!proto) throw new Error(`Service definition for ${protoPath} not found`);

  return proto;
}
