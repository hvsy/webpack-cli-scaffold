import { MultiCompiler } from "webpack";
import { Request } from "express";
export declare type virtualRouterOptions = {};
export default function (options: virtualRouterOptions, compiler: MultiCompiler): (request: Request, res: any, next: any) => void;
