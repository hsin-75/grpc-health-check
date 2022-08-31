"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProto = exports.defaultOptions = exports.HEALTH_PROTO_PATH = void 0;
const grpc = __importStar(require("@grpc/grpc-js"));
const path_1 = __importDefault(require("path"));
const protoLoader = __importStar(require("@grpc/proto-loader"));
exports.HEALTH_PROTO_PATH = path_1.default.resolve(`${__dirname}/proto/health.proto`);
exports.defaultOptions = {
    arrays: true,
    keepCase: true,
    longs: String,
    enums: String,
    objects: true,
    defaults: true,
};
function getProto(protoPath = exports.HEALTH_PROTO_PATH, options = exports.defaultOptions) {
    const definitions = protoLoader.loadSync(protoPath, options);
    const proto = grpc.loadPackageDefinition(definitions);
    if (!proto)
        throw new Error(`Service definition for ${protoPath} not found`);
    return proto;
}
exports.getProto = getProto;
//# sourceMappingURL=proto-definition.js.map