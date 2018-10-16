//CHeck if document is ready to be use
if(document.getElementById('multi-form-add-nav') != undefined){
    console.log('horror-add.js loaded');
    const first = document.getElementById('first-form-add');
    const sec = document.getElementById('sec-form-add');
    const third = document.getElementById('third-form-add');

    const mini = document.getElementById('mini-form-add');
    const encounter = document.getElementById('encounter-form-add');
    const mythe = document.getElementById('mythe-form-add');
    
    first.addEventListener('click', () =>{
        mini.style.display = 'block';
        encounter.style.display = 'none';
        mythe.style.display = 'none'
    });

    sec.addEventListener('click', () =>{
        mini.style.display = 'none';
        encounter.style.display = 'block';
        mythe.style.display = 'none'
    });

    third.addEventListener('click', () =>{
        mini.style.display = 'none';
        encounter.style.display = 'none';
        mythe.style.display = 'block'
    });

}