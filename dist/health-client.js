"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthClient = void 0;
const proto_definition_1 = require("./proto-definition");
class HealthClient {
    client;
    constructor(address, credentials) {
        const proto = (0, proto_definition_1.getProto)();
        this.client = new proto.grpc.health.v1.Health(address, credentials);
    }
    async check(service) {
        return new Promise((resolve, reject) => {
            this.client.check({ service }, (err, res) => {
                if (err)
                    return reject(err);
                resolve(res || {});
            });
        });
    }
    watch(service) {
        return this.client.watch({ service });
    }
}
exports.HealthClient = HealthClient;
//# sourceMappingURL=health-client.js.map