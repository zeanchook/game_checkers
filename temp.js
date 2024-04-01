  /*----- constants -----*/
  const rowMAX = 10;
  const colMAX = 10;
  let checkersProperty = 
  {
    "1": "blackChess",
    "-1": "whiteChess",
  }
  let playersTurn =
  {
    "1": "Player 1",
    "-1": "Player 2"
  }
   
  /*----- state variables -----*/
  let boardArrVal = [];
  const boardRowLen = 10;
  const boardColLen = 10;

  let prevClickRow ;
  let prevClickCol;

  let possibleMoveArr = [];

  let jumpedOver = [];

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
    let checkersLength = gamePageDiv.children.length
    if (checkersLength !== 0 )
    {
        for(let i = 0 ; i < checkersLength ; i++)
        {
            gamePageDiv.children[0].remove()
        }
    }
    initBoard();

    // create row first
    for (let i = 0 ;i < boardRowLen;i++)
    {
        let createMainDivRow = document.createElement("div");
        let createMainDivRowClassName = "row";
        createMainDivRow.setAttribute("class",createMainDivRowClassName);   
        gamePageDiv.append(createMainDivRow)   
    }

    // the create column 
    for(let row = 0 ; row < gamePageDiv.childNodes.length;row++)
    {
        for(let col = 0 ; col < boardColLen; col++)
        {
            let createMainDivCol = document.createElement("div");
            let backgroundName;
            if(row % 2 === 0)
            {   
                if(col % 2 === 0)
                {
                    backgroundName = "blackbckgrd";
                }
                else
                {
                    backgroundName = "whitebckgrd";                           
                }    
            }
            else
            {
                if(col % 2 !== 0)
                {
                    backgroundName = "blackbckgrd";
                }
                else
                {
                    backgroundName = "whitebckgrd";                   
                }     
            }
            createMainDivCol.setAttribute("class",concatNames("col",backgroundName));
            createCheckers(row,col,createMainDivCol); 
            gamePageDiv.childNodes[row].append(createMainDivCol);   
        }  
    }

    turnVar = 1;
    initBoard2();
    render();
  }

  function renderMessage()
  {
    gamePageMsgDiv.innerHTML = "It is " + playersTurn[turnVar] + " turn! ";
  }

  function render()
  {
    renderBoard();
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
//     for(let i =0; i < boardArrVal.length;i++)
//     {
//     for(let j = 0; j < boardArrVal[i].length;j++)
//     {
//         if (boardArrVal[i][j] === undefined)
//         {
//             boardArrVal[i][j] = "null";
//         }
//     }
// }
boardArrVal.forEach(row => {
    row.forEach((cell, index, arr) => {
        if (cell === undefined) {
            arr[index] = "null";
        }
    });
});

}

function renderBoard()
{
    
    let containerDivRowLevel = gamePageDiv.children
    // console.log(containerDivRowLevel[0].children[3])

    for(let i = 0 ; i < containerDivRowLevel.length ; i++)
    {
        // console.log(`row: ${i}`,containerDivRowLevel[i])

        for(let j = 0 ; j < containerDivRowLevel[i].childElementCount; j++)
        {
            // console.log(`row: ${i} col: ${j}`,containerDivRowLevel[i].children[j],boardArrVal[i][j])

            if (containerDivRowLevel[i].children[j].hasChildNodes())
            {
                // console.log("true")
                // console.log(`row: ${i} col: ${j}`,containerDivRowLevel[i].children[j],boardArrVal[i][j])
                containerDivRowLevel[i].children[j].children[0].setAttribute("class",boardArrVal[i][j])
            }
            
        }
    }
    // console.log(containerDivRowLevel[0].children[3].children[0])

}

// console.log(boardArrVal[1].includes("null"))

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
    possibleMoveArr = [];
}

function userMoves(event)
{
    let chkrClsClick = event.target.className
    let chkrRowClick = parseInt(event.target.getAttribute("row"))
    let chkrColClick = parseInt(event.target.getAttribute("col"))
    // console.log(chkrRowClicked,chkrColClicked,chkrClsClicked)
    

    
        // boardArrVal[checkerRow][checkerCol] = null;

    if (chkrClsClick === "possibleMove")
    {
        let removeCheckerRow = Math.floor((chkrRowClick + prevClickRow) / 2)
        let removeCheckerCol = Math.floor((chkrColClick + prevClickCol) / 2)

        console.log ("removed checker row col: ",removeCheckerRow,removeCheckerCol)
        console.log("previous click: ",prevClickRow,prevClickCol)

        boardArrVal[chkrRowClick][chkrColClick] = boardArrVal[prevClickRow][prevClickCol]

        if (boardArrVal[removeCheckerRow][removeCheckerCol] === checkersProperty[turnVar * -1])
        {
            console.log(boardArrVal[removeCheckerRow][removeCheckerCol])
            boardArrVal[removeCheckerRow][removeCheckerCol] = "null"
        } 

        boardArrVal[prevClickRow][prevClickCol] = "null"
        
        
        // boardArrVal[removeCheckerRow][removeCheckerCol] = "null"
        clearPossibleMove();
        turnVar *= -1;
    }
        
    // console.log("here",turnVar)
    if(chkrClsClick === checkersProperty[turnVar])
    {
        boardArrVal.forEach( x => x.includes("possibleMove") ? clearPossibleMove() : 0)
        prevClickRow = chkrRowClick;
        prevClickCol = chkrColClick;
        computePosMoves(turnVar,chkrRowClick,chkrColClick,0)
    }

    // console.log("rendered")
    render()
}

function computePosMoves (turns,row,col,recurCall)
{
    let rowForwardBackward;
    turns === 1 ? rowForwardBackward = -1 : rowForwardBackward = 1;

    for(let i = -1 ; i < 2 ; i++)
    {
        let insidePreviousClickRol = row
        let insidePreviousClickCol = col

        let currentCol = col + i;
        let currentRow = row + rowForwardBackward;
        currentCol > (boardColLen - 1) ? currentCol = (boardColLen - 1): currentCol < 0 ? currentCol = 0 : currentCol
        console.log("Current Col: ",currentRow,currentCol)

        let directionPosMovesCol = currentCol - prevClickCol;
        let directionPosMovesRow = currentRow - prevClickRow;

        // console.log("Direction: ",col-prevClickCol)
        if (! gamePageDiv.children[currentRow].children[currentCol].className.includes("blackbckgrd"))
        {
            let checkerPosMove = (boardArrVal[currentRow][currentCol])
            let currentVale = "" + checkersProperty[turnVar * -1];

            if (checkerPosMove === "null" && recurCall === 0)
            {
                boardArrVal[currentRow][currentCol] = "possibleMove" 
                possibleMoveArr.push([currentRow,currentCol])     
            }

            else if (checkerPosMove === currentVale)
            {
                console.log("black chess infron: ", currentRow,currentCol)
                console.log("Direction: row x col",directionPosMovesRow,directionPosMovesCol)
                jumpedOver.push([currentRow,currentCol])
                // console.log(jumpedOver)
                // console.log("compute direction and future moves: ",currentRow + directionPosMovesRow,currentCol + directionPosMovesCol) ***

                // let computeFutureMovesRol = currentRow + directionPosMovesRow;
                // let computeFutureMovesCol = currentCol + directionPosMovesCol;

                let computeFutureMovesRol = currentRow + (currentRow - insidePreviousClickRol);
                let computeFutureMovesCol = currentCol + (currentCol - insidePreviousClickCol);

                // console.log("New compute direction and future moves: ",computeFutureMovesRol,computeFutureMovesCol) ***

                // if (computeFutureMovesRol > (boardRowLen - 1))
                // {
                //     computeFutureMovesRol = (boardRowLen - 1)
                // }
                // else if (computeFutureMovesRol < 0)
                // {
                //     computeFutureMovesRol = 0
                // }

                // if (computeFutureMovesCol > (boardColLen - 1))
                // {
                //     computeFutureMovesCol = (boardColLen - 1)
                // }
                // else if (computeFutureMovesCol < 0)
                // {
                //     computeFutureMovesCol = 0
                // }

                if ((computeFutureMovesRol <= (boardRowLen - 1) && computeFutureMovesRol >= 0) && (computeFutureMovesCol <= (boardColLen - 1) && computeFutureMovesCol >= 0))
                {
                    // console.log("computeFutureMoves: ",computeFutureMovesRol,computeFutureMovesCol) ***
                    computeDirection (computeFutureMovesRol,computeFutureMovesCol)
                    // console.log("prev",prevClickRow,prevClickCol) ***
                    if(computeFutureMovesRol!== boardRowLen-1 && computeFutureMovesCol !== boardColLen-1)
                    {
                        computePosMoves (turnVar,computeFutureMovesRol,computeFutureMovesCol,1)
                    }
                }
                
                
            }   
        }        
    }
}

function computeDirection (rows,cols)
{
    console.log("compute Pos moves : ",rows,cols)
    if(boardArrVal[rows][cols] === "null")
    {
        boardArrVal[rows][cols] = "possibleMove"
        possibleMoveArr.push([rows,cols])   
        // possibleMoveArr.push([rows][cols])
    }
}

