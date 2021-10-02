import { ErrorClassType } from '../classes/ErrorClassType';
import { NotThrownError } from '../classes/NotThrownError';

export function shouldThrowSync<E extends Error, C extends ErrorClassType<E> | undefined>(
  type: C | undefined,
  thrower: () => void
): void;
export function shouldThrowSync<E extends Error, C extends ErrorClassType<E> | undefined, T>(
  type: C | undefined,
  thrower: () => void,
  callback: (error: E) => T
): T;
export function shouldThrowSync<E extends Error, C extends ErrorClassType<E> | undefined, T>(
  type: C | undefined,
  thrower: () => void,
  callback?: (error: E) => T
): T | void {
  try {
    thrower();
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/ban-types
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
