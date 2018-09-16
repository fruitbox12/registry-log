import { Entry, EntrySchema } from './pbf/Entry';
import hypercore, { HypercoreOptions, Hypercore, HypercoreValueEncoding } from "hypercore";

export function registryLog(storage: any,
    key?: Buffer | Uint8Array | HypercoreOptions<EntrySchema>,
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
