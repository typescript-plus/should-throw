import { Es5BuiltinClass } from '@typescript-plus/builtin-class-decorator';
import { ErrorClassType, NotThrownError, shouldThrowSync } from '../../../src';

@Es5BuiltinClass()
class CustomError extends Error {}

// tslint:disable-next-line:max-classes-per-file
@Es5BuiltinClass()
class AnotherError extends Error {}

function expectToThrowNotThrown<T extends Error>(type: ErrorClassType<T> | undefined, thrower: () => void) {
  expect(() => {
    shouldThrowSync(type, thrower);
  }).toThrowError(NotThrownError);
}

describe(__filename, () => {
  it('when not thrown with type', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expectToThrowNotThrown(CustomError, () => {});
  });

  it('when not thrown without type', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expectToThrowNotThrown(undefined, () => {});
  });

  it('when another type is thrown', () => {
    expectToThrowNotThrown(CustomError, () => {
      throw new AnotherError();
    });
  });
});
