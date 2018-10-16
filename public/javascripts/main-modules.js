import '../sass/style.scss';

import { $, $$ } from './modules/bling';

import {loadMap} from './modules/plateau-jdr';

require('./modules/plateau-jdr-control-pan');

require('./modules/reverse-card');

require('./modules/horror/horror-add-card')

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