import { BuiltinClass } from '@typescript-plus/builtin-class-decorator';
import { ErrorClassType, shouldThrowSync } from '../../../src';

@BuiltinClass()
class CustomError extends Error {}

function expectToPassErrorObject<T extends Error>(type: ErrorClassType<T> | undefined) {
  const customError = new CustomError();
  let passed: CustomError | undefined;
  shouldThrowSync(
    type,
    () => {
      throw customError;
    },
    (error: CustomError) => {
      passed = error;
    }
  );
  expect(passed).toBe(customError);
}

describe(__filename, () => {
  it('with type', () => {
    expectToPassErrorObject(CustomError);
  });
  it('without type', () => {
    expectToPassErrorObject(undefined);
  });
});
