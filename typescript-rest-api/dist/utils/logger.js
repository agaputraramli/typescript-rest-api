"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
require("winston-daily-rotate-file");
const path_1 = __importDefault(require("path"));
const logDirectory = path_1.default.join(__dirname, '../../logs');
const transportOptions = {
    dirname: logDirectory,
    filename: '%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '14d',
};
// Filter khusus untuk hanya menerima level tertentu
const filterOnly = (level) => winston_1.default.format((info) => (info.level === level ? info : false))();
const logger = winston_1.default.createLogger({
    level: 'error',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
    transports: [
        //Log Trace
        new winston_1.default.transports.DailyRotateFile(Object.assign(Object.assign({}, transportOptions), { filename: 'trace-%DATE%.log', level: 'debug', format: winston_1.default.format.combine(filterOnly('debug')) })),
        //Log Stream
        new winston_1.default.transports.DailyRotateFile(Object.assign(Object.assign({}, transportOptions), { filename: 'stream-%DATE%.log', level: 'info', format: winston_1.default.format.combine(filterOnly('info')) })),
        //Log Error
        new winston_1.default.transports.DailyRotateFile(Object.assign(Object.assign({}, transportOptions), { filename: 'error-%DATE%.log', level: 'error', format: winston_1.default.format.combine(filterOnly('error')) })),
        new winston_1.default.transports.Console({
            format: winston_1.default.format.simple(),
            level: 'debug',
        }),
    ],
});
exports.default = logger;
