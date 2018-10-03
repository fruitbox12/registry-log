import { Hypercore } from 'hypercore';
import { EntrySchema } from "./pbf/Entry";
export declare class EntryWriter {
    private feed;
    constructor(feed: Hypercore<EntrySchema>);
    create(entry: EntrySchema, registered?: EntrySchema | void): Promise<boolean>;
    update(entry: EntrySchema, registered?: EntrySchema | void): Promise<boolean>;
    remove(entry: EntrySchema, registered?: EntrySchema | void): Promise<boolean>;
}
//# sourceMappingURL=EntryWriter.d.ts.map