import { TreeNode } from "./FilesTree";
import { ReactNode } from "react";
export declare const createTreeRender: (fn: (node: TreeNode, children?: any) => ReactNode) => (node: TreeNode) => {};
