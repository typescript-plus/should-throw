import { BuiltinClass } from '@typescript-plus/builtin-class-decorator';
import { NotThrown, shouldThrow, shouldThrowSync } from '../src';

// tslint:disable:max-classes-per-file

@BuiltinClass()
class CustomError extends Error {}
const ERROR = new CustomError();

@BuiltinClass()
class AnotherCustomError extends Error {}
const ANOTHER_ERROR = new AnotherCustomError();

describe('shouldThrow', () => {
  describe('with type, async throwing and async callback', () => {
    it('returns callback result.', async () => {
      const error = await shouldThrow(
        CustomError,
        async () => {
          throw ERROR;
        },
        async (e: CustomError) => e
      );
      expect(error).toBe(ERROR);
    });
  });
  describe('with type, async throwing and sync callback', () => {
    it('returns callback result.', async () => {
      const error = await shouldThrow(
        CustomError,
        async () => {
          throw ERROR;
        },
        (e: CustomError) => e
      );
      expect(error).toBe(ERROR);
    });
  });
  describe('with type, async throwing and no callback', () => {
    it('works.', async () => {
      await shouldThrow(CustomError, async () => {
        throw ERROR;
      });
    });
  });

  describe('with type, sync throwing and async callback', () => {
    it('returns callback result.', async () => {
      const error = await shouldThrow(
        CustomError,
        () => {
          throw ERROR;
        },
        async (e: CustomError) => e
      );
      expect(error).toBe(ERROR);
    });
  });
  describe('with type, sync throwing and sync callback', () => {
    it('returns callback result.', async () => {
      const error = await shouldThrow(
        CustomError,
        () => {
          throw ERROR;
        },
        (e: CustomError) => e
      );
      expect(error).toBe(ERROR);
    });
  });
  describe('with type, sync throwing and no callback', () => {
    it('works.', async () => {
      await shouldThrow(CustomError, () => {
        throw ERROR;
      });
    });
  });

  describe('with type, async throwing unmatched error', () => {
    it('throws NotThrown.', async () => {
      let error;
      try {
        await shouldThrow(CustomError, async () => {
          throw ANOTHER_ERROR;
        });
      } catch (err) {
        error = err;
      }
      expect(error instanceof NotThrown).toBe(true);
      expect((error as NotThrown).expected).toBe(CustomError);
      expect((error as NotThrown).actual).toBe(ANOTHER_ERROR);
    });
  });
  describe('with type, sync throwing unmatched error', () => {
    it('throws NotThrown.', async () => {
      let error;
      try {
        await shouldThrow(CustomError, () => {
          throw ANOTHER_ERROR;
        });
      } catch (err) {
        error = err;
      }
      expect(error instanceof NotThrown).toBe(true);
      expect((error as NotThrown).expected).toBe(CustomError);
      expect((error as NotThrown).actual).toBe(ANOTHER_ERROR);
    });
  });

  describe('with type, async throwing nothing', () => {
    it('throws NotThrown.', async () => {
      let error;
      try {
        await shouldThrow(CustomError, async () => {
          //
        });
      } catch (err) {
        error = err;
      }
      expect(error instanceof NotThrown).toBe(true);
      expect((error as NotThrown).expected).toBe(CustomError);
      expect((error as NotThrown).actual).toBe(undefined);
    });
  });
  describe('with type, sync throwing nothing', () => {
    it('throws NotThrown.', async () => {
      let error;
      try {
        await shouldThrow(CustomError, () => {
          //
        });
      } catch (err) {
        error = err;
      }
      expect(error instanceof NotThrown).toBe(true);
      expect((error as NotThrown).expected).toBe(CustomError);
      expect((error as NotThrown).actual).toBe(undefined);
    });
  });

  describe('with no type, async throwing and async callback', () => {
    it('returns callback result.', async () => {
      const error = await shouldThrow(
        undefined,
        async () => {
          throw ERROR;
        },
        async (e: CustomError) => e
      );
      expect(error).toBe(ERROR);
    });
  });
  describe('with no type, async throwing and sync callback', () => {
    it('returns callback result.', async () => {
      const error = await shouldThrow(
        undefined,
        async () => {
          throw ERROR;
        },
        (e: CustomError) => e
      );
      expect(error).toBe(ERROR);
    });
  });
  describe('with no type, async throwing and no callback', () => {
    it('works.', async () => {
      await shouldThrow(undefined, async () => {
        throw ERROR;
      });
      // Expects no error.
    });
  });

  describe('with no type, sync throwing and async callback', () => {
    it('returns callback result.', async () => {
      const error = await shouldThrow(
        undefined,
        () => {
          throw ERROR;
        },
        async (e: CustomError) => e
      );
      expect(error).toBe(ERROR);
    });
  });
  describe('with no type, sync throwing and sync callback', () => {
    it('returns callback result.', async () => {
      const error = await shouldThrow(
        undefined,
        () => {
          throw ERROR;
        },
        (e: CustomError) => e
      );
      expect(error).toBe(ERROR);
    });
  });
  describe('with no type, sync throwing and no callback', () => {
    it('works.', async () => {
      await shouldThrow(undefined, () => {
        throw ERROR;
      });
      // Expects no error.
    });
  });

  describe('with no type, async throwing nothing', () => {
    it('throws NotThrown.', async () => {
      let error;
      try {
        await shouldThrow(undefined, async () => {
          //
        });
      } catch (err) {
        error = err;
      }
      expect(error instanceof NotThrown).toBe(true);
      expect((error as NotThrown).expected).toBe(undefined);
      expect((error as NotThrown).actual).toBe(undefined);
    });
  });
  describe('with no type, sync throwing nothing', () => {
    it('throws NotThrown.', async () => {
      let error;
      try {
        await shouldThrow(undefined, () => {
          //
        });
      } catch (err) {
        error = err;
      }
      expect(error instanceof NotThrown).toBe(true);
      expect((error as NotThrown).expected).toBe(undefined);
      expect((error as NotThrown).actual).toBe(undefined);
    });
  });
});

describe('shouldThrowSync', () => {
  describe('with type, sync throwing and sync callback', () => {
    it('returns callback result.', () => {
      const error = shouldThrowSync(
        CustomError,
        () => {
          throw ERROR;
        },
        (e: CustomError) => e
      );
      expect(error).toBe(ERROR);
    });
  });
  describe('with type, sync throwing and no callback', () => {
    it('works.', () => {
      shouldThrowSync(CustomError, () => {
        throw ERROR;
      });
      // Expects no error.
    });
  });

  describe('with type, sync throwing unmatched error', () => {
    it('throws NotThrown.', () => {
      let error;
      try {
        shouldThrowSync(CustomError, () => {
          throw ANOTHER_ERROR;
        });
      } catch (err) {
        error = err;
      }
      expect(error instanceof NotThrown).toBe(true);
      expect((error as NotThrown).expected).toBe(CustomError);
      expect((error as NotThrown).actual).toBe(ANOTHER_ERROR);
    });
  });

  describe('with type, sync throwing nothing', () => {
    it('throws NotThrown.', () => {
      let error;
      try {
        shouldThrowSync(CustomError, () => {
          //
        });
      } catch (err) {
        error = err;
      }
      expect(error instanceof NotThrown).toBe(true);
      expect((error as NotThrown).expected).toBe(CustomError);
      expect((error as NotThrown).actual).toBeUndefined();
    });
  });

  describe('with no type, sync throwing and sync callback', () => {
    it('returns callback result.', () => {
      const error = shouldThrowSync(
        undefined,
        () => {
          throw ERROR;
        },
        (e: CustomError) => e
      );
      expect(error).toBe(ERROR);
    });
  });
  describe('with no type, sync throwing and sync callback', () => {
    it('returns callback result.', () => {
      const error = shouldThrowSync(
        undefined,
        () => {
          throw ERROR;
        },
        (e: CustomError) => e
      );
      expect(error).toBe(ERROR);
    });
  });
  describe('with no type, sync throwing and no callback', () => {
    it('works.', () => {
      shouldThrowSync(undefined, () => {
        throw ERROR;
      });
      // Expects no error.
    });
  });

  describe('with no type, sync throwing and sync callback', () => {
    it('returns callback result.', () => {
      const error = shouldThrowSync(
        undefined,
        () => {
          throw ERROR;
        },
        (e: CustomError) => e
      );
      expect(error).toBe(ERROR);
    });
  });
  describe('with no type, sync throwing and sync callback', () => {
    it('returns callback result.', () => {
      const error = shouldThrowSync(
        undefined,
        () => {
          throw ERROR;
        },
        (e: CustomError) => e
      );
      expect(error).toBe(ERROR);
    });
  });
  describe('with no type, sync throwing and no callback', () => {
    it('works.', () => {
      shouldThrowSync(undefined, () => {
        throw ERROR;
      });
      // Expects no error.
    });
  });

  describe('with no type, sync throwing nothing', () => {
    it('throws NotThrown.', () => {
      let error;
      try {
        shouldThrowSync(undefined, async () => {
          //
        });
      } catch (err) {
        error = err;
      }
      expect(error instanceof NotThrown).toBe(true);
      expect((error as NotThrown).expected).toBe(undefined);
      expect((error as NotThrown).actual).toBe(undefined);
    });
  });
});
