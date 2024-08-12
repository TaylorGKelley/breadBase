"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! -- Shutting down');
    console.log(err.name, err.message);
    process.exit(1);
});
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './config.env' });
const app_js_1 = __importDefault(require("./app.js"));
const dbConnection = (_b = (_a = process.env) === null || _a === void 0 ? void 0 : _a.DB_URI) === null || _b === void 0 ? void 0 : _b.replace('<password>', (_c = process.env.DB_PASSWORD) !== null && _c !== void 0 ? _c : 'password');
if (dbConnection !== undefined) {
    mongoose_1.default
        .connect(dbConnection)
        .then(() => console.log('Database connected successfully'))
        .catch((err) => console.log(`Database connection failed: ${err.message}`));
}
else {
    console.log('No DB connection string provided. Please check the .env file.');
}
const port = process.env.PORT || 5000;
const server = app_js_1.default.listen(port, () => {
    console.log(`App listening on port ${port};`);
    console.log(`Test locally on: http://localhost:${port}/api/v1`);
});
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! -- Shutting down');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1); // 0 stands for success while 1 stands for uncalled for exception
    });
});
