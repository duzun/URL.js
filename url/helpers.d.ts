export function is_url(str: string): boolean;
export function is_domain(str: string): boolean;
export function decodeAmp(str: string): string;
export function encodeAmp(str: string): string;
export function urldecode(str: string): string;

export function defProp(obj: object, prop: string, get: () => any, set: (value: any) => void): object;
