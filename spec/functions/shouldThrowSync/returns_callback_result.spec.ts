import { BuiltinClass } from '@typescript-plus/builtin-class-decorator';
import { ErrorClassType, shouldThrowSync } from '../../../src';

const RESULT = {};

@BuiltinClass()
class CustomError extends Error {}

function expectToReturnCallbackResult<T extends Error>(type: ErrorClassType<T> | undefined, thrown: T | undefined) {
  expect(
    // tslint:disable-next-line:no-inferred-empty-object-type
    shouldThrowSync(
      type,
      () => {
        throw thrown;
      },
      () => RESULT
    )
  ).toBe(RESULT);
}

describe(__filename, () => {
  it('with type', () => {
    expectToReturnCallbackResult(CustomError, new CustomError());
  });
  it('without type', () => {
    expectToReturnCallbackResult(undefined, undefined);
  });
});
