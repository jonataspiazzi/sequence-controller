"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const path_1 = tslib_1.__importDefault(require("path"));
const port = process.env.PORT || 3001;
const app = express_1.default();
// SPA STATIC FILES MIDDLEWARE
app.use(express_1.default.static('build'));
// SPA ROUTER HANDLER MIDDLEWARE
app.get('*', (req, res) => {
    return res.sendFile(path_1.default.join(__dirname, '../build/index.html'));
});
// OPEN SERVER
app.listen(port, () => {
    console.log(`server api started in http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map