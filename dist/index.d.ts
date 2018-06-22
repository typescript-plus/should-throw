export declare class NotThrown extends Error {
    expected: {
        new (...args: any[]): Error;
    } | undefined;
    actual: any;
    constructor(expected: {
        new (...args: any[]): Error;
    } | undefined, actual: any);
    readonly actualToString: string;
    readonly expectationMessage: string;
}
export declare type SyncThrower = () => void;
export declare type AsyncThrower = () => Promise<void>;
export declare type Thrower = SyncThrower | AsyncThrower;
export declare type SyncCallback<T, E extends Error> = (error: E) => T;
export declare type AsyncCallback<T, E extends Error> = (error: E) => Promise<T>;
export declare type Callback<T, E extends Error> = SyncCallback<T, E> | AsyncCallback<T, E>;
export declare function shouldThrow<T, C extends {
    new (...args: any[]): E;
}, E extends Error>(type: C | undefined, thrower: Thrower): Promise<void>;
export declare function shouldThrow<T, C extends {
    new (...args: any[]): E;
}, E extends Error>(type: C | undefined, thrower: Thrower, callback: Callback<T, E>): Promise<T>;
export declare function shouldThrowSync<T, C extends {
    new (...args: any[]): E;
}, E extends Error>(type: C | undefined, thrower: SyncThrower): void;
export declare function shouldThrowSync<T, C extends {
    new (...args: any[]): E;
}, E extends Error>(type: C | undefined, thrower: SyncThrower, callback: SyncCallback<T, E>): T;
