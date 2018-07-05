import '../sass/style.scss';

import { $, $$ } from './modules/bling';

import test from './modules/test';

import {loadMap} from './modules/plateau-jdr';

require('./modules/plateau-jdr-control-pan');

//IF plateau-jdr is generated
if($('#app.plateau-jdr')){
    loadMap();

}
//if we get a controlboard to gen a plateau-jdr
if($('#plateau-jdr-control-gen')){
    $('.btn-hide-seek').addEventListener('click',function (e){
        if(this.innerText === "Cacher" || this.innerText === "Hide"){
            this.innerText = "Afficher";   
            $('#plateau-jdr-control-gen').classList.add("hidden"); 
        }
        else{
            this.innerText = "Cacher";
            $('#plateau-jdr-control-gen').classList.remove("hidden"); 
        }
        
    });
}