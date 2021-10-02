import { Es5BuiltinClass } from '@typescript-plus/builtin-class-decorator';
import { ErrorClassType, NotThrownError, shouldThrow } from '../../../src';

@Es5BuiltinClass()
class CustomError extends Error {}

// tslint:disable-next-line:max-classes-per-file
@Es5BuiltinClass()
class AnotherError extends Error {}

function expectToThrowNotThrown<T extends Error>(
  done: DoneFn,
  type: ErrorClassType<T> | undefined,
  thrower: () => Promise<void>
) {
  shouldThrow(type, thrower)
    .then(() => {
      done.fail();
    })
    .catch((reason) => {
      expect(() => {
        throw reason;
      }).toThrowError(NotThrownError);
      done();
    });
}

describe(__filename, () => {
  it('when not thrown with type', (done) => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expectToThrowNotThrown(done, CustomError, async () => {});
  });

  it('when not thrown without type', (done) => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expectToThrowNotThrown(done, undefined, async () => {});
  });

  it('when another type is thrown', (done) => {
    // eslint-disable-next-line @typescript-eslint/require-await
    expectToThrowNotThrown(done, CustomError, async () => {
      throw new AnotherError();
    });
  });
});
