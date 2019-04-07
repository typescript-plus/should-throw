import { BuiltinClass } from '@typescript-plus/builtin-class-decorator';
import { ErrorClassType, shouldThrow } from '../../../src';

@BuiltinClass()
class CustomError extends Error {}

async function expectToPassErrorObject<T extends Error>(type: ErrorClassType<T> | undefined) {
  const customError = new CustomError();
  let passed: CustomError | undefined;
  await shouldThrow(
    type,
    async () => {
      throw customError;
    },
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
