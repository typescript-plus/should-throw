// tslint:disable-next-line:interface-over-type-literal
export type ErrorClassType<T extends Error> = { new (...args: any[]): T };
