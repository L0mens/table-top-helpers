const classToClickToActivate = "reverse-card" //String of className to active the reverse action

function turnCard(front,back,backActive){

  if(!backActive){
    front.style.transform = 'rotateY(180deg)';
    back.style.transform = 'rotateY(0deg)';
    back.classList.toggle("back-active");
  }
  else{
    front.style.transform = 'rotateY(0deg)';
    back.style.transform = 'rotateY(-180deg)';
    back.classList.toggle("back-active");
  }
}

const cards = Array.from(document.getElementsByClassName(classToClickToActivate));


cards.forEach(e => { 
    e.addEventListener("click", (click) => {
        var backActive = e.children[1].classList.contains("back-active");
        turnCard(e.children[0],e.children[1],backActive);
    });
});