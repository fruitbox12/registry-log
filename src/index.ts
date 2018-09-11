import { Entry, EntrySchema } from '../schema';
import Pbf from 'pbf';
import { Hypercore } from '../types/hypercore';
const hypercore = require('hypercore');

export function decode(msg: Buffer): EntrySchema {
    const pbf = new Pbf(msg);
    return Entry.read(pbf);
}

export function encode(msg: EntrySchema): Uint8Array {
    const pbf = new Pbf();
    msg.time = Date.now();
    Entry.write(msg, pbf);
    const buffer = pbf.finish();
    return buffer;
}

export function registryLog(storage: any, key?: Buffer | null, opts?: any): Hypercore<EntrySchema> {
    if ("object" === typeof key) {
        opts = key;
        key = null;
    }
    if (!opts) opts = {};
    opts.valueEncoding = { encode, decode };
    return hypercore(storage, key, opts);
}
