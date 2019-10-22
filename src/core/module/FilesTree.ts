import _findIndex from 'lodash/findIndex';

import RequireContext = __WebpackModuleApi.RequireContext;
import _kebabCase from "lodash/kebabCase";
import _regexEscape from "lodash/escapeRegExp";

export type TreeNode = {
    name ?:string,
    path?: string,
    children : TreeNode[]
    data ?: NodeData
};

function appendToTree(segments : string[],tree : TreeNode,nodeData : NodeData){
    let currentNode = tree;
    const len = segments.length;
    const passes : string[] = [];
    segments.forEach((segment,i) => {
        const last = len === (i+1);
        const hit = _findIndex(currentNode.children,c => c.name === segment);
        passes.push(segment);
        if(hit === -1){
            const newNode : TreeNode = {
                name : segment,
                path : '/' +  passes.join('/'),
                children : [],
            };
            if(last){
                newNode.data = nodeData;
            }
            currentNode.children.push(newNode);
            currentNode = newNode;
        }else{
            currentNode = currentNode.children[hit];
            if(last){
                currentNode.data = nodeData;
            }
        }
    });
    return tree;
}
export type NodeData = {
    filePath : string,
    path : string,
    ext : string,
    key:string,
    loader : ()=>Promise<any>,
    [index : string] : any,
};

export default class FilesTree{
    private readonly files: __WebpackModuleApi.RequireContext;
    private prefix: string;

    static From(files : RequireContext,prefix : string = './'){
        return new FilesTree(files,prefix);
    }
    getPrefix(){
        return this.prefix;
    }
    setPrefix(prefix){
        this.prefix = prefix;
        return this;
    }
    constructor(files : RequireContext,prefix : string = './'){
        this.files = files;
        this.prefix = prefix;
    }
    toTree(regex : RegExp,callback ?: (nodeData : NodeData,matches : string[],key : string)=>NodeData){
        const prefix = this.prefix;
        const files = this.files;
        let tree : TreeNode = {
            children : []
        };
        files.keys().forEach((key)=>{
            const matches = key.match(regex);
            if(matches){
                const [,filePath,ext] = matches;
                const path = filePath.replace(new RegExp('^' + _regexEscape(prefix)),'');
                const segments = path.split('/').map(_kebabCase);
                let nodeData : NodeData= {
                    filePath,
                    ext,
                    key,
                    path: segments.join('/'),
                    loader(){
                        return files(key).then((m : any) => {
                            return m.default && m;
                        })
                    }
                };
                if(callback)
                nodeData = callback(nodeData,matches,key);
                tree = appendToTree(segments,tree,nodeData);
            }
        });
        return tree;
    }
}