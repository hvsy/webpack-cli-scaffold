import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";

export default (name,App,Container,targetId = 'root')=>{
    const main = Container ? <Container>
        <App name={name} />
    </Container> : <App name={name} />;
    let root= document.getElementById(targetId);
    if(!root){
        root = document.createElement('div');
        root.id = targetId;
        document.body.append(root);
    }
    return ReactDOM.render(main,root);
}
