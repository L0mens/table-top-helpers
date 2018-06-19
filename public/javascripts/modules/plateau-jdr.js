function replace() {
    const torigin = document.getElementsByClassName('origintr');
    if(torigin.length > 0){        
        const width = torigin[0].clientWidth;
        const heigth = torigin[0].clientHeight;
        const body = document.getElementById('plateau');
        const tbody = body.getElementsByTagName('tbody')[0];
        tbody.style.backgroundPosition =  `${width}px ${heigth}px`;
        tbody.style.backgroundSize = `${tbody.scrollWidth}px ${tbody.scrollHeight}px`;
    }

}


function rescaleWithZoom(){
    const zoom = document.getElementById('zoom-value').value;
    const caseSize = document.getElementById('case-size').value;
    const casesList = Array.from(document.getElementsByClassName('case'));
    const tbody = document.getElementById('app').getElementsByTagName('tbody')[0];
    const baseWidth = caseSize || casesList[0].offsetWidth;
    const baseHeight = caseSize || casesList[0].offsetHeight;
    casesList.forEach(cases => {
        cases.style.height = baseHeight * zoom+"px";
        cases.style.minWidth = baseWidth * zoom+"px";
    });
    
}

function changeBG(){
    const strMap = document.getElementsByTagName('select')[0].value;
    const tbody = document.getElementById('app').getElementsByTagName('tbody')[0];
    tbody.style.background = "url(/images/maps/"+strMap+".jpg) no-repeat"
}

function loadMap(){
    changeBG();
    rescaleWithZoom();
    replace();
}

export {loadMap};