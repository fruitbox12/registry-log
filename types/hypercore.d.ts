import { Readable, Writable, Duplex } from 'stream';
import { EventEmitter } from 'events';

declare interface HypercoreOptions {
    createIfMissing?: boolean;
    overwrite?: boolean;
    valueEncoding?: 'json' | 'utf-8' | 'binary';
    sparse?: boolean;
    secretKey?: Buffer;
    storeSecretKey?: boolean;
    storageCacheSize?: number;
    onwrite?(index: number, data: Buffer, peer: string, cb: () => void): void;
}

declare interface HypercoreGetOptions {
    wait?: boolean;
    timeout?: number;
    valueEncoding?: 'json' | 'utf-8' | 'binary';
}

declare interface HypercoreDownloadRange {
    start: number;
    end?: number;
    linear?: boolean;
}

declare interface HypercoreSignatureIndex {
    index?: number,
    signature?: Buffer
}

declare interface HypercoreNode {
    index: number;
    size: number;
    hash: Buffer;
}

declare interface HypercoreStreamOptions {
    start?: number;
    end?: number;
    snapshot?: boolean;
    tail?: boolean;
    live?: boolean;
    timeout?: number;
    wait?: boolean;
}

declare interface HypercoreReplicateOptions {
    live?: boolean;
    download?: boolean;
    encrypt?: boolean;
}

declare interface Hypercore<T> extends EventEmitter {

    writable: boolean;
    readable: boolean;
    key: Buffer | null;
    discoveryKey: Buffer | null;
    length: number;

    get(index: number, options: HypercoreGetOptions, callback: (err: Error, data: T) => void): void;
    get(index: number, callback: (err: Error, data: T) => void): void;
    getBatch(start: number, end: number, options: HypercoreGetOptions, callback: (err: Error, data: T) => void): void;
    getBatch(start: number, end: number, callback: (err: Error, data: T) => void): void;
    head(options: HypercoreGetOptions, callback: (err: Error, data: T) => void): void;
    head(callback?: (err: Error, data: T) => void): void;
    download(range: HypercoreDownloadRange, callback: (err: Error, data: T) => void): void;
    download(callback: (err: Error, data: T) => void): void;
    undownload(range: HypercoreDownloadRange): void;
    signature(index: number, callback: (err: Error, signature: HypercoreSignatureIndex) => void): void;
    signature(callback: (err: Error, signature: HypercoreSignatureIndex) => void): void;
    verify(index: number, signature: Buffer, callback: (err: Error, success: boolean) => void): void;
    rootHashes(index: number, callback: (err: Error, roots: HypercoreNode[]) => void): void;
    downloaded(start: number, end: number): number;
    has(index: number): boolean;
    has(start: number, end: number): boolean;
    append(data: T, callback: (err: Error) => void): void;
    clear(start: number, end: number, callback: (err: Error) => void): void;
    clear(start: number, callback: (err: Error) => void): void;
    seek(byteOffset: number, callback: (err: Error, index: number, relativeOffset: number) => void): void;
    update(minLength: number, callback: () => void): void;
    update(callback: () => void): void;
    update(): void;
    createReadStream(options?: HypercoreStreamOptions): Readable;
    createWriteStream(): Writable;
    replicate(options?: HypercoreReplicateOptions): Duplex;
    close(callback: (err: Error) => void): void;

    on(event: "ready" | "append" | "sync" | "close", listener: () => void): this;
    on(event: "error", listener: (err: Error) => void): this;
    on(event: "download", listener: (index: number, data: T) => void): this;
    on(event: "upload", listener: (index: number, data: T) => void): this;
    on(event: string, listener: (...args: any[]) => void): this;

    once(event: "ready" | "append" | "sync" | "close", listener: () => void): this;
    once(event: "error", listener: (err: Error) => void): this;
    once(event: "download", listener: (index: number, data: T) => void): this;
    once(event: "upload", listener: (index: number, data: T) => void): this;
    once(event: string, listener: (...args: any[]) => void): this;

}