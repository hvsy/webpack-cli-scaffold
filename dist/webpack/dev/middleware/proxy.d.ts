declare type ProxyRule = ((pathname: string, request: any) => boolean) | {
    passes: string[];
} | string[];
export declare type ProxyOptions = {
    rule: ProxyRule;
    options?: {
        port?: string | number;
        host?: string;
    };
};
export default function (opts: ProxyOptions): any;
export {};
