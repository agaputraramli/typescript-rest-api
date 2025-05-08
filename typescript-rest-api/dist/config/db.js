"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_1 = require("pg");
exports.db = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'pubuser',
    password: 'publicPass',
    port: 5432,
});
