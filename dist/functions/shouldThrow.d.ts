import { ErrorClassType } from '../classes/ErrorClassType';
export declare function shouldThrow<E extends Error, C extends ErrorClassType<E> | undefined, T>(type: C | undefined, thrower: () => Promise<void>): Promise<void>;
export declare function shouldThrow<E extends Error, C extends ErrorClassType<E> | undefined, T>(type: C | undefined, thrower: () => Promise<void>, callback: (error: E) => Promise<T>): Promise<T>;
