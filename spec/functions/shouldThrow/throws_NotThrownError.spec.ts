import { BuiltinClass } from '@typescript-plus/builtin-class-decorator';
import { ErrorClassType, NotThrownError, shouldThrow } from '../../../src';

@BuiltinClass()
class CustomError extends Error {}

// tslint:disable-next-line:max-classes-per-file
@BuiltinClass()
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
    .catch(reason => {
      expect(() => {
        throw reason;
      }).toThrowError(NotThrownError);
      done();
    });
}

describe(__filename, () => {
  it('when not thrown with type', done => {
    // tslint:disable-next-line:no-empty
    expectToThrowNotThrown(done, CustomError, async () => {});
  });

  it('when not thrown without type', done => {
    // tslint:disable-next-line:no-empty
    expectToThrowNotThrown(done, undefined, async () => {});
  });

  it('when another type is thrown', done => {
    expectToThrowNotThrown(done, CustomError, async () => {
      throw new AnotherError();
    });
  });
});
