import { ErrorClassType } from '../classes/ErrorClassType';
import { NotThrownError } from '../classes/NotThrownError';

export async function shouldThrow<E extends Error, C extends ErrorClassType<E> | undefined, T>(
  type: C | undefined,
  thrower: () => Promise<void>
): Promise<void>;
export async function shouldThrow<E extends Error, C extends ErrorClassType<E> | undefined, T>(
  type: C | undefined,
  thrower: () => Promise<void>,
  callback: (error: E) => Promise<T>
): Promise<T>;
export async function shouldThrow<E extends Error, C extends ErrorClassType<E> | undefined, T>(
  type: C | undefined,
  thrower: () => Promise<void>,
  callback?: (error: E) => Promise<T>
): Promise<T | void> {
  try {
    await thrower();
  } catch (err) {
    // tslint:disable-next-line:ban-types
    if (type !== undefined && !(err instanceof (type as Function))) {
      throw new NotThrownError(type, err);
    }
    if (callback === undefined) {
      return;
    } else {
      return callback(err as E);
    }
  }
  throw new NotThrownError(type, undefined);
}
