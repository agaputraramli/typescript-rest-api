"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../config/db");
const logger_1 = __importDefault(require("../utils/logger"));
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { identifier, password } = req.body;
    try {
        const query = `
      SELECT * FROM users 
      WHERE email = $1 OR username = $1
      LIMIT 1
    `;
        const result = yield db_1.db.query(query, [identifier]);
        const user = result.rows[0];
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            logger_1.default.error('User not found', { identifier });
            return; // Jangan lanjutkan fungsi setelah mengirim respons
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ error: 'Invalid password' });
            logger_1.default.error('Invalid password attempt', { identifier });
            return; // Jangan lanjutkan fungsi setelah mengirim respons
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' });
        logger_1.default.info('User logged in successfully', { identifier });
        res.json({ token });
    }
    catch (err) {
        const error = err;
        logger_1.default.error('An error occurred during login', { error: error.message });
        next(error); // Passing error to the next middleware
    }
});
exports.login = login;
