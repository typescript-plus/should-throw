import { BuiltinClass } from '@typescript-plus/builtin-class-decorator';

@BuiltinClass()
export class NotThrown extends Error {
  constructor(public expected: { new (...args: any[]): Error } | undefined, public actual: any) {
    super();
  }

  get actualToString(): string {
    if (this.actual !== undefined && this.actual instanceof Object) {
      return (this.actual as object).constructor.name;
    }
    return `${this.actual}`;
  }

  get expectationMessage() {
    return `Expected ${this.actualToString} to be ${this.expected ? this.expected.name : undefined}.`;
  }
}

export type SyncThrower = () => void;
export type AsyncThrower = () => Promise<void>;
export type Thrower = SyncThrower | AsyncThrower;

export type SyncCallback<T, E extends Error> = (error: E) => T;
export type AsyncCallback<T, E extends Error> = (error: E) => Promise<T>;
export type Callback<T, E extends Error> = SyncCallback<T, E> | AsyncCallback<T, E>;

export function shouldThrow<T, C extends { new (...args: any[]): E }, E extends Error>(
  type: C | undefined,
  thrower: Thrower
): Promise<void>;

export function shouldThrow<T, C extends { new (...args: any[]): E }, E extends Error>(
  type: C | undefined,
  thrower: Thrower,
  callback: Callback<T, E>
): Promise<T>;

export async function shouldThrow<T, C extends { new (...args: any[]): E }, E extends Error>(
  type: C | undefined,
  thrower: Thrower,
  callback?: Callback<T, E>
): Promise<void | T> {
  let throwerResult: Promise<void> | undefined | void;
  try {
    throwerResult = thrower();
  } catch (err) {
    try {
      throwNotThrown(type, err);
    } catch (notThrownOrElse) {
      return Promise.reject(notThrownOrElse);
    }
    if (callback === undefined) {
      return Promise.resolve();
    }
    return Promise.resolve(callback(err as E));
  }
  if (throwerResult === undefined || !(typeof (throwerResult as any).then === 'function')) {
    throw new NotThrown(type, undefined);
  }
  if (callback === undefined) {
    // tslint:disable-next-line:no-parameter-reassignment
    callback = (error: E) => undefined as any;
  }
  return new Promise<T>((resolve, reject) => {
    (throwerResult as Promise<void>)
      .then(() => {
        reject(new NotThrown(type, undefined));
      })
      .catch(reason => {
        try {
          throwNotThrown(type, reason);
        } catch (notThrownOrElse) {
          reject(notThrownOrElse);
        }
        if (callback === undefined) {
          resolve();
        } else {
          resolve(callback(reason as E));
        }
      });
  });
}

export function shouldThrowSync<T, C extends { new (...args: any[]): E }, E extends Error>(
  type: C | undefined,
  thrower: SyncThrower
): void;

export function shouldThrowSync<T, C extends { new (...args: any[]): E }, E extends Error>(
  type: C | undefined,
  thrower: SyncThrower,
  callback: SyncCallback<T, E>
): T;

export function shouldThrowSync<T, C extends { new (...args: any[]): E }, E extends Error>(
  type: C | undefined,
  thrower: SyncThrower,
  callback?: SyncCallback<T, E>
): void | T {
  try {
    thrower();
  } catch (err) {
    throwNotThrown(type, err);
    if (callback !== undefined) {
      return callback(err as E);
    }
    return;
  }
  throw new NotThrown(type, undefined);
}

function throwNotThrown<C extends { new (...args: any[]): Error }>(type: C | undefined, error: any) {
  if (type === undefined) {
    if (error instanceof Error) {
      return;
    }
  } else {
    if (error instanceof type) {
      return;
    }
  }
  if (error === undefined) {
    throw new NotThrown(type, undefined);
  } else {
    throw new NotThrown(type, error);
  }
}
