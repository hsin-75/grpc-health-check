"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checker = void 0;
const logger_1 = __importDefault(require("@fonoster/logger"));
const health_client_1 = require("./health-client");
async function checker(service, address) {
    const health = new health_client_1.HealthClient(address);
    try {
        const { status } = await health.check(service);
        logger_1.default.info(`@fonoster/grpc-health-check healthcheck success [status: ${status}]`);
        process.exit(0);
    }
    catch (error) {
        logger_1.default.error(`@fonoster/grpc-health-check healthcheck failed: ${error}`, error);
        process.exit(1);
    }
}
exports.checker = checker;
//# sourceMappingURL=checker.js.map