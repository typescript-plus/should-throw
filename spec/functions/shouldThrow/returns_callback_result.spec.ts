import { BuiltinClass } from '@typescript-plus/builtin-class-decorator';
import { ErrorClassType, NotThrownError, shouldThrow } from '../../../src';

const RESULT = {};

@BuiltinClass()
class CustomError extends Error {}

async function expectToReturnCallbackResult<T extends Error>(
  type: ErrorClassType<T> | undefined,
  thrown: T | undefined
) {
  expect(
    await shouldThrow(
      type,
      async () => {
        throw thrown;
      },
      async () => RESULT
    )
  ).toBe(RESULT);
}

describe(__filename, () => {
  it('with type', async () => expectToReturnCallbackResult(CustomError, new CustomError()));
  it('without type', async () => expectToReturnCallbackResult(undefined, undefined));
});
