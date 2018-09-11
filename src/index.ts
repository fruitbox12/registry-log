import { Entry, EntrySchema } from './pbf/Entry';
import { Hypercore } from '../types/hypercore';
const hypercore = require('hypercore');

export function registryLog(storage: any, key?: Buffer | null, opts?: any): Hypercore<EntrySchema> {
    if ("object" === typeof key) {
        opts = key;
        key = null;
    }
    if (!opts) opts = {};
    opts.valueEncoding = Entry;
    return hypercore(storage, key, opts);
}
