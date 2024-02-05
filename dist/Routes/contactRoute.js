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
exports.ContactRoute = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const contactModel_1 = require("../Models/contactModel");
const authMiddlerware_1 = __importDefault(require("../Middleware/authMiddlerware"));
//......
exports.ContactRoute = express_1.default.Router();
exports.ContactRoute.use(express_1.default.json());
exports.ContactRoute.use((0, cors_1.default)());
//.....
exports.ContactRoute.post("/contact/me", authMiddlerware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = Object.assign(Object.assign({}, req.body), { owner: req.user._id });
        const newContact = new contactModel_1.contactModel(payload);
        if (!newContact) {
            return res.status(400).send({ Error: "error to get new contact" });
        }
        yield newContact.save();
        res.status(201).send(newContact);
    }
    catch (error) {
        res.status(400).send({ Error: error.message });
    }
}));
//# sourceMappingURL=contactRoute.js.map