import {NodeData, TreeNode} from "./FilesTree";
import {ReactNode} from "react";

export const createTreeRender = (fn : (node: TreeNode,children?:any)=>
    ReactNode
)=>{
    return (node : TreeNode)=>{
        const {data,children,} = node;
        const childNodes = children.length ===0 ? null : children.map((child) => {
            return fn(child);
        });
        if(!data){
            return childNodes;
        }
        return fn(node,childNodes);
    };
};

