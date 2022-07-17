
const difficultyLevel = document.getElementById("difficulty-Level")
const mineSweeperBoard = document.getElementById("mineSweeperBoard")
let gridboard = []
difficultyLevel.addEventListener('change',function() {
    console.log(difficultyLevel.value)
    if(difficultyLevel.value === "Easy"){
        formBoard(10)
    } else if(difficultyLevel.value === "Medium" ){
        formBoard(15)
    } else{
        formBoard(20)
    }
    
})

function formBoard(level){
    while (mineSweeperBoard.hasChildNodes()) {
        mineSweeperBoard.removeChild(mineSweeperBoard.firstChild);
      }
    gridboard = []
    const numberOfBombs = (level*level) * 0.2;
    let bombsLocation = []
    for(let i=0;i<numberOfBombs;i++){
        let num = Number(Math.random()*(level*level)).toFixed(0);
        while(bombsLocation.includes(num)){
            num = Number(Math.random()*(level*level)).toFixed(0);
        }
        bombsLocation.push(num)
    }
    let gridArrray = Array(level*level).fill('Valid')
    for(let index of bombsLocation){
        gridArrray[index] = "bomb"
    }
    let size = mineSweeperBoard.offsetWidth / level
    console.log(size)
    console.log(gridArrray)
    for(let i=0;i<level*level;i++){
        const singleBlock = document.createElement('div')
        singleBlock.setAttribute('id',i)
        singleBlock.classList.add(gridArrray[i])
        singleBlock.style.width = `${size}px` 
        singleBlock.style.height = `${size}px` 
        if(gridArrray[i]  === "bomb" ){
            singleBlock.style.backgroundColor = "orange";
        } 
        mineSweeperBoard.appendChild(singleBlock)
        gridboard.push(singleBlock)
    }
    //  |   up left     |   up      |   up right        |
    //  |   left        |   i       |   right           |
    //  |   bottom left |   bottom  |   bottom right    |
    for(let i=0 ; i < gridboard.length ; i++ ) {
        let totalBombsAdjacentToI = 0;
        const isLeftColumn = i % level == 0;
        const isRightColumn = ( ( i%level ) == level - 1) ;
        const isTopRow = ( i < level);
        const isBottomRow =  ( i >= (level*(level-1)));


        if(gridboard[i].classList.contains('Valid')){
            
            // //  left
            // if( i>0 && !isLeftEdge && gridboard[i-1].classList.contains('bomb')) totalBombsAdjacentToI++;
            // //  up right
            // if( i>level-1 && !isRightEdge && gridboard[i+1-level].classList.contains('bomb')) totalBombsAdjacentToI++;
            // //  up
            // if( i>level && gridboard[i-level].classList.contains('bomb')) totalBombsAdjacentToI++;
            // //  up left
            // if( i>level+1 && !isleftEdge && gridboard[i-1-level].classList.contains('bomb')) totalBombsAdjacentToI++;
            // //  right
            // if( i%level!=level-1 && !isRightEdge && gridboard[i+1].classList.contains('bomb')) totalBombsAdjacentToI++;
            // // bottom
            // if( i<(level*(level-1)) && !isRightEdge && gridboard[i+1+level].classList.contains('bomb')) totalBombsAdjacentToI++;
            // // bottom left
            // if( i<(level*(level-1)) && !isRightEdge && gridboard[i+1+level].classList.contains('bomb')) totalBombsAdjacentToI++;
            gridboard[i].setAttribute('data',totalBombsAdjacentToI); 
            console.log(gridboard[i])
        }

    }
}