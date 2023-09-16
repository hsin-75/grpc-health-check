"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHealth = void 0;
const HealthCheckResponse_1 = require("./proto/grpc/health/v1/HealthCheckResponse");
const health_service_1 = require("./health-service");
const proto_definition_1 = require("./proto-definition");
const logger_1 = require("@fonoster/logger");
const logger = (0, logger_1.getLogger)({ service: "grpc-health-check", filePath: __filename });
function useHealth(server, proto = (0, proto_definition_1.getProto)()) {
    const statusMap = {
        "": HealthCheckResponse_1._grpc_health_v1_HealthCheckResponse_ServingStatus.SERVING,
    };
    const service = new health_service_1.HealthCheck(statusMap);
    server.addService(proto.grpc.health.v1.Health.service, service);
    logger.verbose("added healthcheck service");
    return server;
}
exports.useHealth = useHealth;
//# sourceMappingURL=add-health-to-server.js.map