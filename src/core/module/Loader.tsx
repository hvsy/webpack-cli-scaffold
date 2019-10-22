import _remove from "lodash/remove";
import {NodeData, TreeNode} from "./FilesTree";
import React, { Suspense } from "react";
import {Switch,Route} from "react-router-dom";
import {createTreeRender} from "./renderTree";

type ModuleLoaderCallback = (...args)=>Promise<any>


const getModule = (module)=>{
    return module.default || module;
};


type ContainerProps= {
    nodeData : NodeData,
    path?:string,
    callbacks ?: ModuleLoaderCallback[],
    children:any,
};
const Container = ({nodeData ,children,callbacks = [] } : ContainerProps)=>{
    const {path,} = nodeData;
    const promises = Promise.all([
        nodeData.loader(),
        ...callbacks.map(c=>c(nodeData))
    ]);
    const Lazy = React.lazy(()=>{
        return promises.then(([m,...others]) => {
            const ModuleComponent = getModule(m);
            const nest = children?<Switch>
                {children}
            </Switch> : null;
            return {
                default : (props)=>
                    <ModuleComponent {...props}
                                     path={path}
                    >{nest}</ModuleComponent>
            }
        })
    });
    return <Suspense fallback={<div>loading</div>}>
        <Lazy />
    </Suspense>   ;
};





export default class ModuleLoader{
    callbacks :ModuleLoaderCallback[] =[];
    private tree: TreeNode;
    constructor(tree : TreeNode){
        this.tree = tree;
    }
    addListener(callback : ModuleLoaderCallback){
        if(this.callbacks.indexOf(callback) === -1){
            this.callbacks.push(callback);
        }
        return this;
    }
    removeListener(callback : ModuleLoaderCallback){
        this.callbacks = _remove(this.callbacks,(c)=>{
            return c === callback;
        });
        return this;
    }



    render = createTreeRender((node,children = null) => {
        //const path = children ? node.path + "/*" : node.path;
        return <Route path={node.path} key={node.name}>
            <Container nodeData={node.data}
                       callbacks={this.callbacks}
            >{children}</Container>
        </Route>;
    });
    load(){
        return this.tree.children.map(this.render);
    }
}