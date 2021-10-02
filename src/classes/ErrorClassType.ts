// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ErrorClassType<T extends Error> = new (...args: any[]) => T;
