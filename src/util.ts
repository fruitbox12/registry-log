import { EntrySchema } from "./pbf/Entry";
import { createHash } from "crypto";
import { sign as sodiumSign, verify as sodiumVerify, SodiumSignaturesKeyPair } from "sodium-signatures";
import { generate as stronglinkGen, verify as stronglinkVerify } from {'hypercore-strong-link'}
const loglink = (message:string) => console.log('signed ' + link);

interface StrongLinkError{
    (message:string):void;
}
(err, link) {
       if (err) throw err
       console.log(link) // {feed: someFeed.key, seq: 42, treeHash: <buf>}
       stronglinkVerify(entry.key, link, function (err, data) {
       if (err) throw err
    // otherwise the data at the seq is returned
       console.log(data)
export interface ShortEntrySchema {
    name: string;
    target: string;
    title?: string;
    description?: string;
    removed?: boolean;
}

export function hash(entry: ShortEntrySchema | EntrySchema): Buffer {
    return createHash("sha256").update(Buffer.concat([
        Buffer.from(entry.name),
        Buffer.from(entry.target),
        Buffer.from(entry.title || ""), 
        Buffer.from(entry.description || ""),
        Buffer.from([entry.removed || false])
    ])).digest();
}

export function sign(secretKey: Buffer, entry: ShortEntrySchema | EntrySchema): Buffer {
    return sodiumSign(hash(entry), secretKey);
}

export function verify(entry: EntrySchema): boolean {
    return sodiumVerify(hash(entry), entry.sig as Buffer, entry.key as Buffer);
}

export function createEntry(keys: SodiumSignaturesKeyPair, name: string, target: string): EntrySchema {
    const entry: EntrySchema = {
        key: keys.publicKey,
        sig: Buffer.alloc(0),
        verify: false,
        created: 0,
        link: 0,
        updated: 0,
        name, target,
        removed: false
    };
    entry.sig = sign(keys.secretKey, entry);
    entry.gen = stronglinkGen(entry.key, entry.updated, callback: StrongLinkError)
    calback(entry.key)
    entry.verify=stronglinkVerify(entry.key, entry.updated, callback: StrongLinkError)
    
    return entry;
}

export function updateEntry(keys: SodiumSignaturesKeyPair, target: string, entry: EntrySchema) {
    if (!Buffer.from(entry.key).equals(keys.publicKey) && !entry.removed) {
        throw new Error("The key can't be updated or rewritten. The public key is not equal!");
    }
    const newEntry = { ...entry };
    newEntry.target = target;
    newEntry.sig = sign(keys.secretKey, newEntry);
    return newEntry;
}

export function removeEntry(keys: SodiumSignaturesKeyPair, entry: EntrySchema) {
    if (!Buffer.from(entry.key).equals(keys.publicKey)) {
        throw new Error("The key can't be updated or rewritten. The public key is not equal!");
    }
    else if (entry.removed) {
        throw new Error("The entry is already removed!");
    }
    const newEntry = { ...entry };
    newEntry.removed = true;
    newEntry.sig = sign(keys.secretKey, newEntry);
    return newEntry;
}

export function writable(newEntry: EntrySchema, oldEntry?: EntrySchema | void): boolean {
    if (oldEntry) {
        if ('undefined' !== typeof oldEntry.updated && 'undefined' !== typeof newEntry.updated && newEntry.updated > oldEntry.updated) {
            return verify({ ...newEntry, key: oldEntry.key }) && !newEntry.removed;
        }
        return false;
    }
    return verify(newEntry) && !newEntry.removed;
}

export function removable(newEntry: EntrySchema, oldEntry?: EntrySchema | void): boolean {
    if (oldEntry) {
        if ('undefined' !== typeof oldEntry.updated && 'undefined' !== typeof newEntry.updated && oldEntry.updated < newEntry.updated) {
            return verify({ ...newEntry, key: oldEntry.key }) && newEntry.removed === true;
        }
        return false;
    }
    return verify(newEntry) && !!newEntry.removed === true;
}
