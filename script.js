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
  const boardRowLen = 6;
  const boardColLen = 6;

  let removeBefore = 0;

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
    let turnIdx = turnVar;
    Math.abs(turnVar) === 2 ? turnIdx = (turnIdx / 2): turnIdx;
    gamePageMsgDiv.innerHTML = "It is " + playersTurn[turnIdx] + " turn! ";
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
    possibleMoveArr = [];
}

function userMoves(event)
{
    let chkrClsClick = event.target.className
    let chkrRowClick = parseInt(event.target.getAttribute("row"))
    let chkrColClick = parseInt(event.target.getAttribute("col"))
    let kingMoves = 0;

    if(boardArrVal[chkrRowClick][chkrColClick].includes("isKing"))
    {
        // let kingProperty = boardArrVal[chkrRowClick][chkrColClick].split(checkersProperty[turnVar])[1]
        // let checkersPropertyLeft = boardArrVal[chkrRowClick][chkrColClick].split(checkersProperty[turnVar])[0]

        // kingProperty === "isKing" ? kingMoves = 1 : kingMoves = 0;
        console.log("clicked:",boardArrVal[chkrRowClick][chkrColClick])
        turnVar *= 2;
        if(turnVar > 2)
        {
            turnVar = 2;
        }
        else if(turnVar < -2 )
        {
            turnVar = -2;
        }
        
    }
    else if (!boardArrVal[chkrRowClick][chkrColClick].includes("isKing"))
    {
        console.log("go in here?")
        if (Math.abs(turnVar) === 2)
        {
            console.log("go in here? or here")
            turnVar /=2;
        }
        
    }
    console.log("turnvar:",turnVar)
    if (chkrClsClick === "possibleMove")
    {
        removeBefore = 0;
        let removeCheckerRow = Math.floor((chkrRowClick + prevClickRow) / 2)
        let removeCheckerCol = Math.floor((chkrColClick + prevClickCol) / 2)
        console.log ("removed checker row col: ",removeCheckerRow,removeCheckerCol)
        console.log("previous click: ",prevClickRow,prevClickCol)

       for(let i = 0; i < jumpedOver.length;i++)
       {
        if ((removeCheckerRow === jumpedOver[i][0]) && (removeCheckerCol === jumpedOver[i][1]))
        {
            if (boardArrVal[jumpedOver[i][0]][jumpedOver[i][1]] === checkersProperty[turnVar * -1])
            {
                boardArrVal[jumpedOver[i][0]][jumpedOver[i][1]] = "null"
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
            console.log(chkrRowClick,chkrColClick)
            boardArrVal[chkrRowClick][chkrColClick] += "isKing"
        }
        else if ((chkrRowClick === 0) && boardArrVal[chkrRowClick][chkrColClick] === "blackChess")
        {
            console.log(chkrRowClick,chkrColClick)
            boardArrVal[chkrRowClick][chkrColClick] += "isKing"
        }

        //compute possible move agn
        if (removeBefore)
        {
            computePosMoves(turnVar,chkrRowClick,chkrColClick,1) === 0 ? turnVar *= -1 : turnVar
            console.log("here1")
            turnVar = turnVar;
        }
        else
        {
            console.log("here2")
            turnVar *= -1;
        }
        
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

function computePosMoves (turns,row,col,kingsMove)
{
    let rowForwardBackward;
    turns === 1 ? rowForwardBackward = -1 : rowForwardBackward = 1;
    let possibleMove = 0;
    for(let i = -1 ; i < 2 ; i++)
    {
        let insidePreviousClickRol = row
        let insidePreviousClickCol = col

        let currentCol = col + i;
        let currentRow = row + rowForwardBackward;
        currentCol > (boardColLen - 1) ? currentCol = (boardColLen - 1): currentCol < 0 ? currentCol = 0 : currentCol


        currentRow > (boardRowLen - 1) ? currentRow = (boardRowLen - 1): currentRow < 0 ? currentRow = 0 : currentRow
        console.log("Current Col: ",currentRow,currentCol)

        let directionPosMovesCol = currentCol - prevClickCol;
        let directionPosMovesRow = currentRow - prevClickRow;

        if (! gamePageDiv.children[currentRow].children[currentCol].className.includes("blackbckgrd"))
        {
            let checkerPosMove = (boardArrVal[currentRow][currentCol])
            let currentVale = "" + checkersProperty[turnVar * -1];

            if (checkerPosMove === "null" && kingsMove === 0)
            {
                boardArrVal[currentRow][currentCol] = "possibleMove" 
                possibleMoveArr.push([currentRow,currentCol])
            }

            else if (checkerPosMove === currentVale)
            {
                
                jumpedOver.push([currentRow,currentCol])
                let computeFutureMovesRol = currentRow + (currentRow - insidePreviousClickRol);
                let computeFutureMovesCol = currentCol + (currentCol - insidePreviousClickCol);

            
                if ((computeFutureMovesRol <= (boardRowLen - 1) && computeFutureMovesRol >= 0) && (computeFutureMovesCol <= (boardColLen - 1) && computeFutureMovesCol >= 0))
                {
                    computeDirection (computeFutureMovesRol,computeFutureMovesCol)
                    possibleMove = 1;
                }
                
            }   
        }        
    }

    return possibleMove;

}

function computeDirection (rows,cols)
{
    console.log("compute Pos moves : ",rows,cols)
    if(boardArrVal[rows][cols] === "null")
    {
        boardArrVal[rows][cols] = "possibleMove"
        possibleMoveArr.push([rows,cols])   
    }
}



