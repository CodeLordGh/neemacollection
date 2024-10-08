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
// api.test.ts
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const user_model_1 = require("../Models/user.model");
describe('API Tests', () => {
    // clear test database after each test
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user_model_1.UserModel.deleteMany({});
    }));
    it('should return a success message for POST /api', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post('/api/auth/register').send({ name: 'testuser', password: 'testpassword', email: 'testemail@test.com' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'User created');
    }));
    it('should return an error for POST /api/auth/login with invalid credentials', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default)
            .post('/api/auth/register')
            .send({ username: 'testuser', password: 'incorrectpassword' });
        expect(response.status).toBe(401);
        expect(response.body).toEqual({ error: 'Invalid credentials' });
    }));
    // Add more test cases as needed
});
