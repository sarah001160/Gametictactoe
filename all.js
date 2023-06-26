const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATION = [ //贏局連線的組合
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8]
];
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector("#board");
const winningMessageElement = document.querySelector('#winning-message');
const restartButton = document.querySelector('#restartButton');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');

//換方設定 O換X、X換O 
let circleTurn;

//startGame 函式
startGame();
restartButton.addEventListener('click',startGame);
function startGame(){
    circleTurn =false;
    //監聽格子
    cellElements.forEach((cell)=>{
        cell.classList.remove(CIRCLE_CLASS);//清空格子
        cell.classList.remove(X_CLASS);//清空格子
        cell.removeEventListener('click',handleClick);
        cell.addEventListener('click',handleClick,{once:true});
        //once:true 只能觸發一次
    })
    winningMessageElement.classList.remove('show');

}

function handleClick(e){
    //console.log(e.target)
    const cell = e.target ;//<div data-cell>目前點擊的格子
    const currentClass = circleTurn? CIRCLE_CLASS:X_CLASS ;//三元運算子判斷classname
    placeMark(cell, currentClass);//下棋
    if(checkWin(currentClass)){ //檢查是否有贏家,參數是當前的currentClass (X_CLASS or CIRCLE_CLASS)
        endGame(false)
    }else if(isDraw()){ //如果平手了
        endGame(true)
    }else{
        swapTurn();//換邊
        setBoardHoverClass();//顯示灰影
    }
   
  
}

function checkWin(currentClass){ //檢查是否有贏家
//檢查贏局組合當中是否有任一一組符合?
//把組合內的所有index數字,核對.cell的格子位置,是否皆有同樣的currentClass?
return WINNING_COMBINATION.some(combination=>{
    return combination.every(index=>{
        return cellElements[index].classList.contains(currentClass);
        //回傳booleans
    })
})

}

function isDraw(){
    //檢查所有的div.cell是否都有classname,檢查格子是否都填滿O X了
    return[...cellElements].every(cell=>{
        return cell.classList.contains(CIRCLE_CLASS) || cell.classList.contains(X_CLASS);
        //回傳boolean
    })
}
function endGame(draw){
    if(draw){ //if true 平手
        winningMessageTextElement.innerText="平手!";
    }else{ // if false 出現贏家
        winningMessageTextElement.innerText=`${circleTurn? 'O':'X'} 贏了!`;
    }
    winningMessageElement.classList.add('show');
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass);//.cell加入classname 
}

function swapTurn(){
//反轉circleTurn狀態 換邊
 circleTurn = !circleTurn; 
}

function setBoardHoverClass(){
    board.classList.remove(CIRCLE_CLASS);//移除前一次的
    board.classList.remove(X_CLASS);//移除前一次的
    if(circleTurn){ //circleTurn =true時 由O下棋
        board.classList.add(CIRCLE_CLASS)
    }else{ //circleTurn=false時 由X下棋
        board.classList.add(X_CLASS)
    }
}



