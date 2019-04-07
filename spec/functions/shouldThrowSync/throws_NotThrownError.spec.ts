import { BuiltinClass } from '@typescript-plus/builtin-class-decorator';
import { ErrorClassType, NotThrownError, shouldThrowSync } from '../../../src';

@BuiltinClass()
class CustomError extends Error {}

// tslint:disable-next-line:max-classes-per-file
@BuiltinClass()
class AnotherError extends Error {}

function expectToThrowNotThrown<T extends Error>(type: ErrorClassType<T> | undefined, thrower: () => void) {
  expect(() => {
    shouldThrowSync(type, thrower);
  }).toThrowError(NotThrownError);
}

describe(__filename, () => {
  it('when not thrown with type', () => {
    // tslint:disable-next-line:no-empty
    expectToThrowNotThrown(CustomError, () => {});
  });

  it('when not thrown without type', () => {
    // tslint:disable-next-line:no-empty
    expectToThrowNotThrown(undefined, () => {});
  });

  it('when another type is thrown', () => {
    expectToThrowNotThrown(CustomError, () => {
      throw new AnotherError();
    });
  });
});
