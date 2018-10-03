/// <reference types="@types/node" />
export interface EntrySchema {
    key: Uint8Array;
    sig: Uint8Array;
    created: number;
    updated?: number;
    removed?: boolean;
    name: string;
    target: string;
    title?: string;
    description?: string;
}
export declare const Entry: {
    decode(buf: Uint8Array | Buffer): EntrySchema;
    encode(obj: EntrySchema): Uint8Array;
};
//# sourceMappingURL=Entry.d.ts.map