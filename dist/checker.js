"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checker = void 0;
const logger_1 = require("@fonoster/logger");
const health_client_1 = require("./health-client");
const logger = (0, logger_1.getLogger)({ service: "grpc-health-check", filePath: __filename });
async function checker(service, address) {
    const health = new health_client_1.HealthClient(address);
    try {
        const { status } = await health.check(service);
        logger.verbose(`healthcheck success [status: ${status}]`);
        process.exit(0);
    }
    catch (error) {
        logger.error(`healthcheck failed: ${error}`, error);
        process.exit(1);
    }
}
exports.checker = checker;
//# sourceMappingURL=checker.js.map