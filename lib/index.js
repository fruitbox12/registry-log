"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entry_1 = require("./pbf/Entry");
const hypercore = require('hypercore');
function registryLog(storage, key, opts) {
    if (key && !(key instanceof Uint8Array)) {
        opts = key;
        key = undefined;
    }
    if (key) {
        key = Buffer.from(key);
    }
    if (!opts)
        opts = {};
    opts.valueEncoding = Entry_1.Entry;
    return hypercore(storage, key, opts);
}
exports.registryLog = registryLog;
//# sourceMappingURL=index.js.map