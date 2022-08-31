"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHealth = void 0;
const HealthCheckResponse_1 = require("./proto/grpc/health/v1/HealthCheckResponse");
const health_service_1 = require("./health-service");
const proto_definition_1 = require("./proto-definition");
const logger_1 = __importDefault(require("@fonoster/logger"));
function useHealth(server, proto = (0, proto_definition_1.getProto)()) {
    const statusMap = {
        "": HealthCheckResponse_1._grpc_health_v1_HealthCheckResponse_ServingStatus.SERVING,
    };
    const service = new health_service_1.HealthCheck(statusMap);
    server.addService(proto.grpc.health.v1.Health.service, service);
    logger_1.default.info("added healthcheck service from @fonoster/grpc-health-check");
    return server;
}
exports.useHealth = useHealth;
//# sourceMappingURL=add-health-to-server.js.map