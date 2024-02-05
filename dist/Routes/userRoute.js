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
exports.UserRoute = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userModel_1 = require("../Models/userModel");
const authMiddlerware_1 = __importDefault(require("../Middleware/authMiddlerware"));
//......
exports.UserRoute = express_1.default.Router();
exports.UserRoute.use(express_1.default.json());
exports.UserRoute.use((0, cors_1.default)());
//.....
exports.UserRoute.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = new userModel_1.userModel(req.body);
        const token = yield newUser.getToken();
        const results = yield newUser.save();
        res.status(201).send({ user: results, token: token });
    }
    catch (error) {
        res.status(500).send({ Error: error.message });
    }
}));
exports.UserRoute.get("/user/me", authMiddlerware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        res.status(200).send({ user: user });
    }
    catch (error) {
        res.status(400).send({ Error: error.message });
    }
}));
//# sourceMappingURL=userRoute.js.map