
```typescript

    import {common} from "@hvsy/webpack-cli-scaffold";
    const example = common({
        enableCssModule : true,
        dev : true,
        react : {
        
        },
        html :{
        
        },
        
    }).config((config)=>{
        config.entry('test').add('....').end();
    });
    const config = example.toConfig();
```