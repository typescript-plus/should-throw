import { BuiltinClass } from '@typescript-plus/builtin-class-decorator';
import { ErrorClassType } from './ErrorClassType';

@BuiltinClass()
export class NotThrownError extends Error {
  constructor(public expected: ErrorClassType<Error> | undefined, public actual: any) {
    super();
  }

  get actualToString(): string {
    if (this.actual !== undefined && this.actual instanceof Object) {
      return (this.actual as object).constructor.name;
    }
    return `${this.actual}`;
  }

  get expectationMessage() {
    return `Expected ${this.actualToString} to be ${this.expected ? this.expected.name : undefined}.`;
  }
}
