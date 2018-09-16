"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pbf_1 = __importDefault(require("pbf"));
exports.Entry = {
    decode(buf) {
        const pbf = new pbf_1.default(buf);
        return pbf.readFields((tag, obj, pbf) => {
            if (tag === 1 && obj && pbf) {
                obj.key = pbf.readBytes();
            }
            else if (tag === 2 && obj && pbf) {
                obj.sig = pbf.readBytes();
            }
            else if (tag === 3 && obj && pbf) {
                obj.time = pbf.readVarint();
            }
            else if (tag === 4 && obj && pbf) {
                obj.name = pbf.readString();
            }
            else if (tag === 5 && obj && pbf) {
                obj.target = pbf.readString();
            }
        }, { key: new Uint8Array(0), sig: new Uint8Array(0), time: 0, name: "", target: "" });
    },
    encode(obj) {
        const pbf = new pbf_1.default();
        if (obj.key) {
            pbf.writeBytesField(1, obj.key);
        }
        if (obj.sig) {
            pbf.writeBytesField(2, obj.sig);
        }
        if (obj.time) {
            pbf.writeVarintField(3, obj.time);
        }
        if (obj.name) {
            pbf.writeStringField(4, obj.name);
        }
        if (obj.target) {
            pbf.writeStringField(5, obj.target);
        }
        const buffer = pbf.finish();
        return Buffer.from(buffer);
    }
};
//# sourceMappingURL=Entry.js.map