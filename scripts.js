let bombs = [];
let width = 0;
let height = 0;
let checked = [];
window.addEventListener("contextmenu", e => e.preventDefault());
document.getElementById('go').addEventListener('click',function () {
    checked = [];
    document.getElementById('game').innerHTML = '';
    width = document.getElementById('width').value;
    height = document.getElementById('height').value;
    document.getElementById('game').style.gridTemplateColumns = 'repeat('+width+',1fr)';
    let total = width*height;
    bombs = random_numbers(total/5,total)
    for (let i=1; i <= total;i++){
        let box= document.createElement('div')
        box.classList.add('box');
        box.addEventListener('click', left_click)
        box.addEventListener('contextmenu',right_click)
        document.getElementById('game').append(box)
    }
})
const left_click = (e)=> squareClick(e)
const right_click = (e)=> setFlag(e)
function squareClick(event){
    let nodes = Array.prototype.slice.call( document.getElementById('game').children );
    let my_box = nodes.indexOf(event.target)+1;
    if (bombs.includes(my_box)){
        event.target.style.backgroundColor = 'red';
    }else {
       reveal(my_box)
    }
}
function setFlag(event){
    event.target.classList.add('flagged');
    event.target.removeEventListener('click',left_click);
}
function random_numbers(number,max) {
    let numbers = [];
    for (let i = 0; i <= max; i++) {
        numbers.push(i);
    }
    // Shuffle the array
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    // Return the first 'count' elements
    return numbers.slice(1, number);
}

function getConnectedBoxes(index) {
    let d = [];
    let row = Math.ceil(index/width)
    let column = width - (width*row - index)
    if (row < height){
        d.push(index + +width); //width
    }
    if (row > 1){//static
        d.push(index - +width ) //width
    }
    if (column > 1){
        d.push(index-1) //static;
    }
    if (column < width){ //cols
        d.push(index+1) //static;
    }
    if (column > 1 && row > 1){
        d.push(index - +width -1);
    }
    if (column < width && row > 1){
        d.push(index - +width + 1);
    }
    if (column > 1 && row < height){
        d.push(index + +width - 1);
    }
    if (column < width && row < height){
        d.push(index + +width + 1);
    }
    return d;
}
function reveal(index){
    checked.push(index)
    let box =document.querySelector(`.box:nth-child(${index})`);
    if (box){
        box.removeEventListener('click',left_click);
        box.removeEventListener('click',right_click);
    let connected = getConnectedBoxes(index);
    let count = 0
    connected.forEach(e=>{
        if (bombs.includes(e)){
            count++
        }
    })
    if ( count === 0 ){
        box.classList.add('empty')
         connected.forEach(e=>{
           if (!checked.includes(e)){
               reveal(e)
           }
        })
    }else {
        if (count === 1){
            box.style.color = 'blue'
        }else if(count === 2){
            box.style.color = 'green'
        }
        else if(count === 3){
            box.style.color = 'red'
        }else if(count === 4){
            box.style.color = 'darkgreen'
        }
        else if(count === 5){
            box.style.color = 'darkblue'
        }
        box.classList.add('revealed')
        box.innerHTML = ''+count;
    }
    }
}

