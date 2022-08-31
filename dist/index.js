"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcHealthCheck = void 0;
const grpc_boom_1 = __importDefault(require("grpc-boom"));
const HealthCheckResponse_1 = require("./proto/grpc/health/v1/HealthCheckResponse");
class GrpcHealthCheck {
    statusMap;
    watchStatusMap = {};
    watchErrorMap = {};
    constructor(statusMap) {
        this.statusMap = statusMap;
    }
    setStatus(service, status) {
        this.statusMap[service] = status;
    }
    check(call, callback) {
        const service = call.request.service;
        const status = this.statusMap[service];
        if (!status) {
            callback(grpc_boom_1.default.notFound(`Unknown service: ${service}`), undefined);
        }
        else {
            callback(undefined, { status });
        }
    }
    watch(call) {
        const service = call.request.service;
        const interval = setInterval(() => {
            let updatedStatus = HealthCheckResponse_1._grpc_health_v1_HealthCheckResponse_ServingStatus.SERVING;
            if (!this.statusMap[service]) {
                updatedStatus = HealthCheckResponse_1._grpc_health_v1_HealthCheckResponse_ServingStatus.SERVICE_UNKNOWN;
                this.setStatus(service, updatedStatus);
                call.write({ status: updatedStatus });
            }
            this.watchStatusMap[service] = updatedStatus;
            if (!this.watchErrorMap[service]) {
                const lastStatus = this.statusMap[service] || -1;
                if (lastStatus !== updatedStatus) {
                    this.setStatus(service, updatedStatus);
                    call.write({ status: updatedStatus }, (error) => {
                        if (error) {
                            this.watchErrorMap[service] = error;
                        }
                    });
                }
            }
            else {
                clearInterval(interval);
                call.end(this.watchErrorMap[service]);
            }
        }, 1000);
    }
}
exports.GrpcHealthCheck = GrpcHealthCheck;
//# sourceMappingURL=index.js.map