import common from "../../src/webpack/common";
import console from "console";

it('commons',()=>{
    console.dir(common({
        plugin : {
            'react' : {

            },
            'html' : {
                filename : 'admin.html',
                template : 'admin.ejs',
            }
        }
    }).toConfig(),{
        depth:8,
        showHidden : false,
        colors : true,
    });
});