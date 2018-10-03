import { Hypercore } from 'hypercore';
import { EntrySchema } from "./pbf/Entry";
import { verify } from './util';

export class EntryWriter {
    public constructor(private feed: Hypercore<EntrySchema>) { }

    public create(entry: EntrySchema, registered?: EntrySchema | void): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            if (!registered) {
                const created = Date.now();
                const updated = created;
                entry = {
                    ...entry,
                    created,
                    updated,
                    removed: false
                };
                if (verify(entry)) {
                    this.feed.append(entry, async (err: Error) => {
                        if (err) return reject(err);
                        resolve(true);
                    });
                } else {
                    resolve(false);
                }
            } else {
                resolve(false);
            }
        });
    }

    public update(entry: EntrySchema, registered?: EntrySchema | void): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            if (registered) {
                const updated = Date.now();
                entry = {
                    ...registered,
                    updated,
                    sig: entry.sig,
                    name: registered.name,
                    target: entry.target
                };
                if (verify(entry)) {
                    this.feed.append(entry, async (err: Error) => {
                        if (err) return reject(err);
                        resolve(true);
                    });
                } else {
                    resolve(false);
                }
            } else {
                resolve(false);
            }
        });
    }

    public remove(entry: EntrySchema, registered?: EntrySchema | void): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            if (registered) {
                const updated = Date.now();
                entry = {
                    ...registered,
                    sig: entry.sig,
                    updated,
                    target: entry.target,
                    removed: true
                }

                if (verify(entry)) {
                    this.feed.append(entry, async (err: Error) => {
                        if (err) return reject(err);
                        resolve(true);
                    });
                } else {
                    resolve(false);
                }
            } else {
                resolve(false);
            }
        });
    }

}
