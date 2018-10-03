/// <reference types="@types/node" />
import { HypercoreOptions, Hypercore } from "hypercore";
import { EntrySchema } from "./pbf/Entry";
export { EntrySchema, Entry } from './pbf/Entry';
export * from "./util";
export declare function registryLog(storage: any, key?: Buffer | Uint8Array | HypercoreOptions<EntrySchema>, opts?: HypercoreOptions<EntrySchema>): Hypercore<EntrySchema>;
//# sourceMappingURL=index.d.ts.map