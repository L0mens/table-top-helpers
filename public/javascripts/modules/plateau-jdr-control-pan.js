var classSelected = "player-1"; 
var terrainSelected ;
var mode = "perso";



function changeSelected(){
    console
    Array.from(document.getElementsByClassName('list-item')).forEach( elem => {
        Array.from(elem.getElementsByTagName("li")).forEach( li => {
            console.log(li.className == classSelected);
            if(li.className.toLowerCase() == classSelected){
                activeItemInList(li);
            }          
        })
    });
    
}

/**
 * Reset tous les items pour remettre la classe selectionné au bon
 * @param {*} id ID pour identifier le LI à cibler avec $() 
 */

function activeItemInList(id){
    
    Array.from(document.getElementsByClassName('list-item')).forEach( elem => {
        Array.from(elem.getElementsByTagName("li")).forEach( li => {
            li.classList.remove("item-selected-on-list");
        }
    )});
    id.classList.add("item-selected-on-list");
}

function removeAllClasses(element){
    element.classList.forEach( classe => {
        element.classList.remove(classe);
    });
}

const cases = Array.from(document.getElementsByClassName('case'));


cases.forEach(c => {
    c.addEventListener('click', function(){
        if(mode == "perso"){
            var listC = this.classList;
            console.log(listC);
            if(listC.length > 1){
                console.log(classSelected);
                classSelected = listC[1];
            }
            changeSelected();        
            Array.from(document.getElementsByClassName(classSelected)).forEach(e => {e.classList.remove(classSelected)});
            this.classList.add(classSelected);
        }
        else if (mode == "terrain"){
            removeAllClasses(this.children[0]);
            this.children[0].classList.add(terrainSelected);
        }
        //console.log(this.children[0]);
    });
});


Array.from(document.getElementsByClassName('list-item')).forEach( elem => {
    Array.from(elem.getElementsByTagName("li")).forEach( li => {
        
        li.addEventListener('click', () => {
            var att ;
            if(li.parentElement.id == "list-item-terrain"){
                mode = "terrain";
                document.getElementById('mode-actu').innerText = mode;
            }
            else{
                mode = "perso";
                document.getElementById('mode-actu').innerText = mode;
            }
            if(mode == "perso"){
                activeItemInList(li);    
                att = li.classList;
                classSelected = att[0]; 
                console.log(classSelected);
            }
            else if (mode == "terrain"){
                activeItemInList(li); 
                att = li.classList;
                terrainSelected = att[0]; 
                console.log(terrainSelected);
            }
            else{
                console.log("Mode Introuvable");
            }           
        });
    });
});
