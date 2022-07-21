

document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('load',function(){
        this.setTimeout(function open(event){
            document.querySelector('.popup').style.display = "block";
        },1000)
    })
    const startGame = document.getElementById("startGame")
    const difficultyLevelOnPopup = document.getElementById("difficulty-Level-on-popup")
    const difficultyLevel = document.getElementById("difficulty-Level")
    const mineSweeperBoard = document.getElementById("mineSweeperBoard")
    let gridboard = []
    let isGameOver = false;
    let gameLevel;
    let flags;
    startGame.addEventListener('click',function() {
        document.querySelector('.popup').style.display = "none";
        document.getElementById("mineSweeper").style.display = "flex";
        difficultyLevel.value = difficultyLevelOnPopup.value;
        console.log(difficultyLevelOnPopup.value)
        if(difficultyLevelOnPopup.value === "Easy"){
            flags = 0
            gameLevel = 10
            formBoard(10)
        } else if(difficultyLevelOnPopup.value === "Medium" ){
            flags = 0
            gameLevel = 15
            formBoard(15)
        } else{
            flags = 0
            gameLevel = 20
            formBoard(20)
        }
        
    })

    difficultyLevel.addEventListener('change',function() {
        console.log(difficultyLevel.value)
        if(difficultyLevel.value === "Easy"){
            flags = 0
            gameLevel = 10
            formBoard(10)
        } else if(difficultyLevel.value === "Medium" ){
            flags = 0
            gameLevel = 15
            formBoard(15)
        } else{
            flags = 0
            gameLevel = 20
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
            /*if(gridArrray[i]  === "bomb" ){
                singleBlock.style.backgroundColor = "orange";
            } */
            mineSweeperBoard.appendChild(singleBlock);
            gridboard.push(singleBlock);
            singleBlock.addEventListener('click',function (){
                boardCellClicked(singleBlock);
            });
            singleBlock.oncontextmenu = function(e) {
                e.preventDefault()
                console.log("FLAG")
                addFlag(singleBlock)
            }
            
        }
        //  |   up left     |   up      |   up right        |
        //  |   left        |   i       |   right           |
        //  |   bottom left |   bottom  |   bottom right    |
        for(let i=0 ; i < gridboard.length ; i++ ) {
            let totalBombsAdjacentToI = 0;
            const isLeftColumn = i % level === 0;
            const isRightColumn = ( ( i%level ) === level - 1) ;
            const isTopRow = ( i < level);
            const isBottomRow =  ( i >= (level*(level-1)));

            if(gridboard[i].classList.contains('Valid')) {

                if(!isLeftColumn && gridboard[i-1].classList.contains('bomb')) totalBombsAdjacentToI++;
                if(!isRightColumn && gridboard[i+1].classList.contains('bomb')) totalBombsAdjacentToI++;
                if(!isTopRow && gridboard[i-level].classList.contains('bomb')) totalBombsAdjacentToI++;
                if(!isBottomRow && gridboard[i+level].classList.contains('bomb')) totalBombsAdjacentToI++;
                if(!isLeftColumn && !isTopRow && gridboard[i-level-1].classList.contains('bomb')) totalBombsAdjacentToI++;
                if(!isRightColumn && !isTopRow && gridboard[i-level+1].classList.contains('bomb')) totalBombsAdjacentToI++;
                if(!isLeftColumn && !isBottomRow && gridboard[i+level-1].classList.contains('bomb')) totalBombsAdjacentToI++;
                if(!isRightColumn && !isBottomRow && gridboard[i+level+1].classList.contains('bomb')) totalBombsAdjacentToI++;

                gridboard[i].setAttribute('data',totalBombsAdjacentToI); 
                //console.log(gridboard[i])
            }
        }
    }

    function boardCellClicked(squareClicked) {
        if(isGameOver) return;
        if(squareClicked.classList.contains('checked') || squareClicked.classList.contains('flag')) return;
        if(squareClicked.classList.contains('bomb')) {
            gameOver(squareClicked)
        } else {
            let totalBombsAdjacentToClickedSquare = squareClicked.getAttribute('data');
            if(totalBombsAdjacentToClickedSquare!=0){
                squareClicked.innerHTML = totalBombsAdjacentToClickedSquare;
                squareClicked.classList.add('checked');
                return;
            }
            squareClicked.classList.add('checked');
            checkNeighbourSquare(squareClicked,squareClicked.id)
           
        }
    }

    function checkNeighbourSquare(squareClicked,currentId){
        const isLeftColumn = currentId % gameLevel === 0;
        const isRightColumn = ( ( currentId%gameLevel ) === gameLevel - 1) ;
        const isTopRow = ( currentId < gameLevel);
        const isBottomRow =  ( currentId >= (gameLevel*(gameLevel-1)));

        setTimeout(() => {
            if(!isLeftColumn){
                const newneighbourId = gridboard[parseInt(currentId)-1].id;
                console.log(newneighbourId);
                const checkNeighbourSquareClicked = document.getElementById(newneighbourId);
                boardCellClicked(checkNeighbourSquareClicked)
            }
            if(!isRightColumn){
                const newneighbourId = gridboard[parseInt(currentId)+1].id;
                const checkNeighbourSquareClicked = document.getElementById(newneighbourId);
                boardCellClicked(checkNeighbourSquareClicked)
            }
            if(!isTopRow){
                const newneighbourId = gridboard[parseInt(currentId)-gameLevel].id;
                const checkNeighbourSquareClicked = document.getElementById(newneighbourId);
                boardCellClicked(checkNeighbourSquareClicked)
            }
            if(!isBottomRow){
                const newneighbourId = gridboard[parseInt(currentId)+gameLevel].id;
                const checkNeighbourSquareClicked = document.getElementById(newneighbourId);
                boardCellClicked(checkNeighbourSquareClicked)
            }
            if(!isLeftColumn && !isTopRow ){
                const newneighbourId = gridboard[parseInt(currentId)-gameLevel-1].id;
                const checkNeighbourSquareClicked = document.getElementById(newneighbourId);
                boardCellClicked(checkNeighbourSquareClicked)
            }
            if(!isRightColumn && !isTopRow ){
                const newneighbourId = gridboard[parseInt(currentId)-gameLevel+1].id;
                const checkNeighbourSquareClicked = document.getElementById(newneighbourId);
                boardCellClicked(checkNeighbourSquareClicked)
            }
            if(!isLeftColumn && !isBottomRow ){
                const newneighbourId = gridboard[parseInt(currentId)+gameLevel-1].id;
                const checkNeighbourSquareClicked = document.getElementById(newneighbourId);
                boardCellClicked(checkNeighbourSquareClicked)
            }
            if(!isRightColumn && !isBottomRow ){
                const newneighbourId = gridboard[parseInt(currentId)+gameLevel+1].id;
                const checkNeighbourSquareClicked = document.getElementById(newneighbourId);
                boardCellClicked(checkNeighbourSquareClicked)
            }
        },10);
    }
    function addFlag(flagBlock) {
        if(isGameOver) return;
        if(!flagBlock.classList.contains('checked') && flags < (gameLevel*gameLevel) * 0.2){
            if(!flagBlock.classList.contains('flag')) {
                flagBlock.classList.add('flag')
                flagBlock.innerHTML = "⛳"
                flags++;
                checkForWin()
            } else {
                flagBlock.classList.remove('flag')
                flagBlock.innerHTML = ""
                flags--;
            }
        }
    }
    function gameOver(squareClicked){
        console.log("Game Over")
        isGameOver = true;

        gridboard.forEach(eachblock =>{
            if(eachblock.classList.contains("bomb")){
                 eachblock.innerHTML = "💣";
            }
        });
    }
    function checkForWin(){
        let countBombs = 0;

        for(let i=0; i < gridboard.length ; i++ ) {
            if(gridboard[i].classList.contains('flag') && gridboard[i].classList.contains('bomb')){
                countBombs++;
            }
            if(countBombs === ((gameLevel*gameLevel) * 0.2)) {
                console.log("YOU WON");
                isGameOver = true;
            }
        }
    }
})