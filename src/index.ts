import { Entry, EntrySchema } from './pbf/Entry';
import { Hypercore, HypercoreOptions, HypercoreValueEncoding } from '../types/hypercore';
const hypercore = require('hypercore');

export function registryLog(storage: any,
    key?: Buffer | null | HypercoreOptions<EntrySchema>,
    opts?: HypercoreOptions<EntrySchema>): Hypercore<EntrySchema> {
    if (key && !(key instanceof Uint8Array)) {
        opts = key as HypercoreOptions<EntrySchema>;
        key = undefined;
    }
    if (key) {
        key = Buffer.from(key);
    }
    if (!opts) opts = {};
    opts.valueEncoding = Entry as HypercoreValueEncoding<EntrySchema>;
    return hypercore(storage, key, opts);
}
