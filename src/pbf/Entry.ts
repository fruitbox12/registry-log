import Pbf from "pbf";

export interface EntrySchema {
    key: Uint8Array;
    sig: Uint8Array;
    time: number;
    name: string;
    target: string;
}

export const Entry = {
    decode(buf: Buffer | Uint8Array): EntrySchema {
        const pbf = new Pbf(buf);
        return pbf.readFields<EntrySchema>((tag: number, obj?: EntrySchema, pbf?: Pbf) => {
            if (tag === 1 && obj && pbf) { obj.key = pbf.readBytes(); }
            else if (tag === 2 && obj && pbf) { obj.sig = pbf.readBytes(); }
            else if (tag === 3 && obj && pbf) { obj.time = pbf.readVarint(); }
            else if (tag === 4 && obj && pbf) { obj.name = pbf.readString(); }
            else if (tag === 5 && obj && pbf) { obj.target = pbf.readString(); }
        }, { key: new Uint8Array(0), sig: new Uint8Array(0), time: 0, name: "", target: "" });
    },

    encode(obj: EntrySchema): Uint8Array {
        const pbf = new Pbf();
        if (obj.key) { pbf.writeBytesField(1, obj.key); }
        if (obj.sig) { pbf.writeBytesField(2, obj.sig); }
        if (obj.time) { pbf.writeVarintField(3, obj.time); }
        if (obj.name) { pbf.writeStringField(4, obj.name); }
        if (obj.target) { pbf.writeStringField(5, obj.target); }
        const buffer = pbf.finish();
        return Buffer.from(buffer);
    }
};