import { Es5BuiltinClass } from '@typescript-plus/builtin-class-decorator';
import { ErrorClassType } from './ErrorClassType';

@Es5BuiltinClass()
export class NotThrownError extends Error {
  constructor(public expected: ErrorClassType<Error> | undefined, public actual: unknown) {
    super();
  }

  get actualToString(): string {
    if (this.actual !== undefined && this.actual instanceof Object) {
      return (this.actual as { constructor: { name: string } }).constructor.name;
    }
    return `${this.actual as string}`;
  }

  get expectationMessage(): string {
    return `Expected ${this.actualToString} to be ${
      this.expected ? (this.expected as { name: string }).name : '[undefined]'
    }.`;
  }
}
