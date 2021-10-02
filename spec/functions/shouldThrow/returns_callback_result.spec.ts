import { Es5BuiltinClass } from '@typescript-plus/builtin-class-decorator';
import { ErrorClassType, shouldThrow } from '../../../src';

const RESULT = {};

@Es5BuiltinClass()
class CustomError extends Error {}

async function expectToReturnCallbackResult<T extends Error>(
  type: ErrorClassType<T> | undefined,
  thrown: T | undefined
) {
  expect(
    await shouldThrow(
      type,
      // eslint-disable-next-line @typescript-eslint/require-await
      async () => {
        throw thrown;
      },
      // eslint-disable-next-line @typescript-eslint/require-await
      async () => RESULT
    )
  ).toBe(RESULT);
}

describe(__filename, () => {
  it('with type', async () => expectToReturnCallbackResult(CustomError, new CustomError()));
  it('without type', async () => expectToReturnCallbackResult(undefined, undefined));
});
