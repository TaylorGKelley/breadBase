"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AppError_js_1 = __importDefault(require("./utils/AppError.js"));
const errorController_js_1 = __importDefault(require("./controllers/errorController.js"));
const index_js_1 = require("./routes/index.js");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const baseRoute = '/api/v1';
app.use(`${baseRoute}/products`, index_js_1.productRoutes);
app.use(`${baseRoute}/recipes`, index_js_1.recipeRoutes);
app.all('*', (req, res, next) => {
    console.log('404');
    next(new AppError_js_1.default(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(errorController_js_1.default);
exports.default = app;
