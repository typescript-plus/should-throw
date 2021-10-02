import { Es5BuiltinClass } from '@typescript-plus/builtin-class-decorator';
import { ErrorClassType, shouldThrow } from '../../../src';

@Es5BuiltinClass()
class CustomError extends Error {}

async function expectToPassErrorObject<T extends Error>(type: ErrorClassType<T> | undefined) {
  const customError = new CustomError();
  let passed: CustomError | undefined;
  await shouldThrow(
    type,
    // eslint-disable-next-line @typescript-eslint/require-await
    async () => {
      throw customError;
    },
    // eslint-disable-next-line @typescript-eslint/require-await
    async (error: CustomError) => {
      passed = error;
    }
  );
  expect(passed).toBe(customError);
}

describe(__filename, () => {
  it('with type', async () => expectToPassErrorObject(CustomError));
  it('without type', async () => expectToPassErrorObject(undefined));
});
