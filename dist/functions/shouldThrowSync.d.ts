import { ErrorClassType } from '../classes/ErrorClassType';
export declare function shouldThrowSync<E extends Error, C extends ErrorClassType<E> | undefined, T>(type: C | undefined, thrower: () => void): void;
export declare function shouldThrowSync<E extends Error, C extends ErrorClassType<E> | undefined, T>(type: C | undefined, thrower: () => void, callback: (error: E) => T): T;
