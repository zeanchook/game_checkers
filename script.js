  /*----- constants -----*/
  const rowMAX = 10;
  const colMAX = 10;
  let checkersProperty = 
  {
    "1": "blackChess",
    "-1": "whiteChess",
    "2": "blackChessisKing",
    "-2": "whiteChessisKing",
  }
  let playersTurn =
  {
    "1": "Player 1",
    "-1": "Player 2"
  }
   
  /*----- state variables -----*/
  let boardArrVal = [];
  const boardRowLen = 4;
  const boardColLen = 4;
  let removeBefore = 0;
  let prevClickRow = 0 ;
  let prevClickCol = 0;
  let numOfCheckers = {};
  let playersMove = {};
  let winner;
  let jumpedOver = [];
  let currentPlayerMoves = 0;

  let turnVar; 

  /*----- cached elements  -----*/
  let bodyMain = document.querySelector("body")
  let gamePageDiv = document.querySelector(".gamepage")
  let gamePageMsgDiv = document.querySelector(".gamepageMsg")
  let startPageDiv = document.querySelector(".startpage")

  
  /*----- event listeners -----*/
  gamePageDiv.addEventListener( ("click"),userMoves)



  /*----- functions -----*/
  init()

  function init()
  {
    let checkersLength = gamePageDiv.children.length;
    if (checkersLength !== 0 )
    {for(let i = 0 ; i < checkersLength ; i++) {gamePageDiv.children[0].remove()}}
    initBoard();

    for (let i = 0 ;i < boardRowLen;i++)
    {
        let createMainDivRow = document.createElement("div");
        let createMainDivRowClassName = "row";
        createMainDivRow.setAttribute("class",createMainDivRowClassName);   
        gamePageDiv.append(createMainDivRow)   
    }

    for(let row = 0 ; row < gamePageDiv.childNodes.length;row++)
    {
        for(let col = 0 ; col < boardColLen; col++)
        {
            let createMainDivCol = document.createElement("div");
            let backgroundName;
            if(row % 2 === 0)
            {   
                (col % 2 === 0) ? backgroundName = "blackbckgrd" : backgroundName = "whitebckgrd";      
            }
            else
            {
                (col % 2 !== 0) ? backgroundName = "blackbckgrd" : backgroundName = "whitebckgrd";          
            }
            createMainDivCol.setAttribute("class",concatNames("col",backgroundName));
            createCheckers(row,col,createMainDivCol); 
            gamePageDiv.childNodes[row].append(createMainDivCol);   
        }  
    }
    winner = "null"
    turnVar = 1;
    initBoard2();
    render();
  }

function renderMessage()
{
    let turnIdx;
    if(winner === "null")
    {
        turnIdx = turnVar;
        Math.abs(turnVar) === 2 ? turnIdx = (turnIdx / 2): turnIdx;
        gamePageMsgDiv.innerHTML = "It is " + playersTurn[turnIdx] + " turn! ";
    }
    else if (Math.abs(winner) === 1)
    {
        console.log("did it go here?")
        // turnIdx = winner;
        // Math.abs(turnVar) === 2 ? turnIdx = (turnIdx / 2): turnIdx;
        gamePageMsgDiv.innerHTML = "Winner is " + playersTurn[winner] + " !";
    }
    else if (winner === "Tie ! ")
    {
        gamePageMsgDiv.innerHTML = "Its a Tie !";
    }   

}

function render()
{
    renderBoard();
    renderPieces();
    winner = getWinner();
    renderMessage();
}

function createChildNodes (classType)
{
    let createBlackChess = document.createElement("div")
    createBlackChess.setAttribute("class",classType)    
    return createBlackChess;
}

function concatNames (variable1,variable2)
{
    return (variable1 + " " + variable2)
}

function createCheckers (currentRowVal,col,parentDiv)
{
    let chessClass = parentDiv.className.split(" ")[1]
    let rowcolAtt = currentRowVal + "-" + col
    let newChildNode;
    if((currentRowVal < (boardRowLen/2)-1) && (chessClass !== "blackbckgrd"))
    { 
        newChildNode = createChildNodes("whiteChess")
        newChildNode.setAttribute("row",currentRowVal);
        newChildNode.setAttribute("col",col);
        parentDiv.append(newChildNode)
        boardArrVal[currentRowVal][col] = "whiteChess";
        return parentDiv;
    }

    if((currentRowVal >= (boardRowLen/2)+1) && (chessClass !== "blackbckgrd"))
    {
        newChildNode = createChildNodes("blackChess")
        newChildNode.setAttribute("row",currentRowVal);
        newChildNode.setAttribute("col",col);
        parentDiv.append(newChildNode)
        boardArrVal[currentRowVal][col] = "blackChess";
        return parentDiv;
    }
    else
    { 
        newChildNode = createChildNodes("none")
        newChildNode.setAttribute("row",currentRowVal);
        newChildNode.setAttribute("col",col);
        parentDiv.append(newChildNode)
        boardArrVal[currentRowVal][col] = "null";
        return parentDiv;
    }
}

// console.log(boardArrVal[0].length)

function initBoard()
{
    boardArrVal.length = boardRowLen;
    for(let i = 0 ; i < boardArrVal.length;i++)
    {
        boardArrVal[i] = [];
        boardArrVal[i].length = boardArrVal.length;
    }
}

function initBoard2()
{
boardArrVal.forEach(row => {row.forEach((cell, index, arr) => 
{if (cell === undefined) {arr[index] = "null";}});});
}

function renderBoard()
{
    let containerDivRowLevel = gamePageDiv.children
    for(let i = 0 ; i < containerDivRowLevel.length ; i++)
    {
        for(let j = 0 ; j < containerDivRowLevel[i].childElementCount; j++)
        {
            if (containerDivRowLevel[i].children[j].hasChildNodes())
            {
                containerDivRowLevel[i].children[j].children[0].setAttribute("class",boardArrVal[i][j])
            }          
        }
    }
}


function clearPossibleMove()
{
    for(let i = 0 ; i < boardArrVal.length ; i ++)
    {
        for(let j = 0 ; j < boardArrVal[i].length ; j++)
        {
            if(boardArrVal[i][j] === "possibleMove")
        {
            boardArrVal[i][j] = "null";
        }
        }
        
    }
}

function userMoves(event)
{
    let chkrClsClick = event.target.className
    let chkrRowClick = parseInt(event.target.getAttribute("row"))
    let chkrColClick = parseInt(event.target.getAttribute("col"))
    let kingMoves = 0;


    for(let itemsInside in checkersProperty)
    {
        if (checkersProperty[itemsInside] === boardArrVal[chkrRowClick][chkrColClick])
        {
            if(Math.abs(turnVar) === 2 && Math.abs(itemsInside) === 1)
            {
                turnVar /= 2;
            }
            else if(Math.abs(turnVar) === 1 && Math.abs(itemsInside) === 2)
            {
                turnVar *= 2;
            }
        }
    }

    if (chkrClsClick === "possibleMove")
    {
        removeBefore = 0;
        let removeCheckerRow = Math.floor((chkrRowClick + prevClickRow) / 2)
        let removeCheckerCol = Math.floor((chkrColClick + prevClickCol) / 2)
        // console.log("removal :",removeCheckerRow,removeCheckerCol)
        let internalTurn = turnVar
        Math.abs(internalTurn) === 2 ? internalTurn = internalTurn/2: internalTurn = internalTurn*2
       for(let i = 0; i < jumpedOver.length;i++)
       {
        if ((removeCheckerRow === jumpedOver[i][0]) && (removeCheckerCol === jumpedOver[i][1]))
        {
            console.log("###",jumpedOver[i][0],jumpedOver[i][1],checkersProperty[turnVar * -1],turnVar)
            if (boardArrVal[jumpedOver[i][0]][jumpedOver[i][1]] === checkersProperty[turnVar * -1] || boardArrVal[jumpedOver[i][0]][jumpedOver[i][1]] === checkersProperty[internalTurn * -1])
            {
                boardArrVal[jumpedOver[i][0]][jumpedOver[i][1]] = "null"
                console.log("jumped over ################## indeeeed remove")
            } 
            delete jumpedOver[i];
            jumpedOver.pop()
            removeBefore = 1;
        }
       }

        boardArrVal[chkrRowClick][chkrColClick] = boardArrVal[prevClickRow][prevClickCol]
        boardArrVal[prevClickRow][prevClickCol] = "null"
        clearPossibleMove();
        jumpedOver = [];
        prevClickRow = chkrRowClick;
        prevClickCol = chkrColClick;


        if((chkrRowClick === boardRowLen - 1) && boardArrVal[chkrRowClick][chkrColClick] === "whiteChess")
        {
            boardArrVal[chkrRowClick][chkrColClick] += "isKing"
        }
        else if ((chkrRowClick === 0) && boardArrVal[chkrRowClick][chkrColClick] === "blackChess")
        {
            boardArrVal[chkrRowClick][chkrColClick] += "isKing"
        }
        console.log("removeBefore is :",removeBefore)
        if (removeBefore)
        {
            console.log("kings move is ?",kingMoves)
            console.log("turnvar?>:",turnVar)
            // computePosMoves(turnVar,chkrRowClick,chkrColClick,1) !== 0 ?  turnVar : turnVar *= -1
            
            let test = computePosMoves(turnVar,chkrRowClick,chkrColClick,1)

            console.log("test",test)

            if (test !== 0)
            {
                turnVar = turnVar;
            }
            else{
                turnVar *= -1;
            }
            // if (computePosMoves(turnVar,chkrRowClick,chkrColClick,1))
            // {
            //     console.log("it is 1")
            //     turnVar *= -1
            // }
            // else
            // {
            //     console.log("it is not 1")
            //     turnVar = turnVar;
            // }

            console.log("turnvar?:",turnVar)
            // turnVar = turnVar;
        }
        else if(removeBefore === 0)
        {
            turnVar *= -1;
        }
        currentPlayerMoves = 1;

        
    }
        
    if (chkrClsClick === checkersProperty[turnVar])
    {
        boardArrVal.forEach( x => x.includes("possibleMove") ? clearPossibleMove() : 0)
        prevClickRow = chkrRowClick;
        prevClickCol = chkrColClick;
        computePosMoves(turnVar,chkrRowClick,chkrColClick,0)
    }
    
    render();
}

function computePosMoves (turns,row,col,kingsMove)
{
    // let rowForwardBackward;
    // turns === 1 ? rowForwardBackward = -1 : rowForwardBackward = 1;

    let length = 1;
    let initial = -1;
    let possibleMove = 0;

    if (Math.abs(turns) === 2)
    {
        length = 2;
        initial = -1;
        console.log("turns:",turns,initial,length)

    }
    else if (turns === 1)
    {
        length = 0;
        initial = -1;
        console.log("turns:",turns,initial,length)

    }
    else if (turns === -1)
    {
        length = 2;
        initial = 1;
        console.log("turns:",turns,initial,length)
    }

    for(let j = initial ; j < length ; j++)    
    {
        
        for(let i = -1 ; i < 2 ; i++)
        {
            let intPreClickRol = row, intPreClickCol = col, curCol = col + i, curRow = row + j;
            
            curRow = checkMinMax(curRow,boardRowLen)
            curCol = checkMinMax(curCol,boardColLen)


            if (! gamePageDiv.children[curRow].children[curCol].className.includes("blackbckgrd"))
            {
                let checkerPosMove = (boardArrVal[curRow][curCol])
                let internalTurn = turns

                Math.abs(internalTurn) === 1 ? internalTurn *= 2: internalTurn
                // internalTurn = internalTurn * 2
                let normalCheckers = "" + checkersProperty[turns * -1];
                let kingCheckers = "" + checkersProperty[internalTurn * -1];

                if (checkerPosMove === "null" && kingsMove === 0)
                {
                    boardArrVal[curRow][curCol] = "possibleMove" 
                    possibleMove = 1
                }

                else if (checkerPosMove === normalCheckers ||checkerPosMove === kingCheckers)
                {
                    jumpedOver.push([curRow,curCol])
                    let findPosRol = curRow + (curRow - intPreClickRol);
                    let findPosCol = curCol + (curCol - intPreClickCol);

                    if ((findPosRol <= (boardRowLen - 1) && findPosRol >= 0) && (findPosCol <= (boardColLen - 1) && findPosCol >= 0))
                    {
                        computeDirection (findPosRol,findPosCol) === true ? possibleMove = 1 : possibleMove;                      
                    }                  
                }   
            }        
        }
}
    return possibleMove;

}

function computeDirection (rows,cols)
{
    if (boardArrVal[rows][cols] === "null")
    {
        boardArrVal[rows][cols] = "possibleMove"
        return true;   
    }
    return false;
}

function checkMinMax (inputVal,len)
{
    inputVal > (len - 1) ? (inputVal = (len - 1)): inputVal < 0 ? inputVal = 0 : inputVal
    return inputVal;
}

function renderPieces()
{
    for(let o in checkersProperty)
    {
    numOfCheckers[checkersProperty[o]] = 0
    for(let i = 0 ; i<boardArrVal.length;i++)
    {
        for(let j = 0 ; j < boardArrVal[i].length;j++)
        {
            if(boardArrVal[i][j] === checkersProperty[o])
            {
                numOfCheckers[checkersProperty[o]] += 1;
            }
        }
   }
    }
}

function getWinner()
{
    let piecesLeft = {}
    for(let items in checkersProperty) 
    {
        (Math.abs(items) === 2) ? idx = items / 2 : idx = items 
        piecesLeft[idx] === undefined ? piecesLeft[idx] = 0 : 0
        piecesLeft[idx]  += numOfCheckers[checkersProperty[items]]
    }

    for(let y in piecesLeft) {if(piecesLeft[y] === 0){return (y*-1)}}

    let player1Turn = 0;
    let internalTurnVar = turnVar;
    Math.abs(internalTurnVar) === 2 ? internalTurnVar = internalTurnVar / 2 : internalTurnVar
    
    if (currentPlayerMoves === 1)
    {
        for(let item in numOfCheckers)
        {
        numOfCheckers[item]
        boardArrVal.forEach((rows,rowsIdx) =>
            {
                rows.forEach((cols,colsIdx) =>
                    {
                        if (boardArrVal[rowsIdx][colsIdx] === item && numOfCheckers[item] !== 0 && (boardArrVal[rowsIdx][colsIdx] === checkersProperty[internalTurnVar]))
                        {
                            player1Turn += computePosMoves(internalTurnVar,rowsIdx,colsIdx,0)
                            playersMove[internalTurnVar] = player1Turn;
                            clearPossibleMove()
                        }
                        else if (boardArrVal[rowsIdx][colsIdx] === item && numOfCheckers[item] !== 0 && (boardArrVal[rowsIdx][colsIdx] === checkersProperty[internalTurnVar*2]))
                        { 
                            player1Turn += computePosMoves(internalTurnVar*2,rowsIdx,colsIdx,0)
                            playersMove[internalTurnVar] = player1Turn;
                            clearPossibleMove()
                        }
                    })
            })
         }
    }

    currentPlayerMoves = 0;
    console.log("players move: ",playersMove,internalTurnVar)
    
    if (playersMove[internalTurnVar] == 0)
    {
            return (internalTurnVar*-1)
    } 
    else if(playersMove[internalTurnVar] == 0 && playersMove[internalTurnVar*-1] == 0)
    {
        return "Tie ! "
    }
    
    return "null"
}
 





    
   
   










