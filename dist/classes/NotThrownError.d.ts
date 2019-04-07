import { ErrorClassType } from './ErrorClassType';
export declare class NotThrownError extends Error {
    expected: ErrorClassType<Error> | undefined;
    actual: any;
    constructor(expected: ErrorClassType<Error> | undefined, actual: any);
    readonly actualToString: string;
    readonly expectationMessage: string;
}
