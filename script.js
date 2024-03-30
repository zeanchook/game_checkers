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
  
  
//   console.log(boardArrVal)
 
  /*----- state variables -----*/
  let boardArrVal = [];
  const boardRowLen = 7;
  const boardColLen = 7;

  let prevClickRow ;
  let prevClickCol;

  let jumpedOver = [];

  let turnVar; 

  /*----- cached elements  -----*/
  let bodyMain = document.querySelector("body")
  let containerDiv = document.querySelector(".container")
  let containerMsgDiv = document.querySelector(".containerMsg")
  

  /*----- event listeners -----*/
  containerDiv.addEventListener( ("click"),userMoves)
  



  /*----- functions -----*/
  init()



  function init()
  {
    let checkersLength = containerDiv.children.length
    if (checkersLength !== 0 )
    {
        for(let i = 0 ; i < checkersLength ; i++)
        {
            containerDiv.children[0].remove()
        }
    }
    initBoard();

    // create row first
    for (let i = 0 ;i < boardRowLen;i++)
    {
        let createMainDivRow = document.createElement("div");
        let createMainDivRowClassName = "row";
        createMainDivRow.setAttribute("class",createMainDivRowClassName);   
        containerDiv.append(createMainDivRow)   
    }

    // the create column 
    for(let row = 0 ; row < containerDiv.childNodes.length;row++)
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
            containerDiv.childNodes[row].append(createMainDivCol);   
        }  
    }

    turnVar = 1;
    initBoard2();
    render();
  }

  function renderMessage()
  {
    containerMsgDiv.innerHTML = "It is " + playersTurn[turnVar] + " turn! ";
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
    for(let i =0; i < boardArrVal.length;i++)
    {
    for(let j = 0; j < boardArrVal[i].length;j++)
    {
        if (boardArrVal[i][j] === undefined)
        {
            boardArrVal[i][j] = "null";
        }
    }
}
}

function renderBoard()
{
    
    let containerDivRowLevel = containerDiv.children
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
        computePosMoves(turnVar,chkrRowClick,chkrColClick)
    }

    console.log("rendered")
    render()
}

function computePosMoves (turns,row,col)
{
    let rowForwardBackward;
    turns === 1 ? rowForwardBackward = -1 : rowForwardBackward = 1;
    

    for(let i = -1 ; i < 2 ; i++)
    {

        // left right
        let currentCol = col + i;
        let currentRow = row + rowForwardBackward;
        let backgroundBoard = 

        currentCol > (boardColLen - 1) ? currentCol = (boardColLen - 1): currentCol < 0 ? currentCol = 0 : currentCol
                
        console.log("current :", currentRow, currentCol)
    
        if (! containerDiv.children[currentRow].children[currentCol].className.includes("blackbckgrd"))
        {
            

            let checkerPosMove = (boardArrVal[currentRow][currentCol])
            console.log("checkerPosMove: ",checkerPosMove)

            let currentVale = "" + checkersProperty[turnVar * -1];
            console.log(currentVale)

            switch (checkerPosMove)
            {
                case "null":
                    boardArrVal[currentRow][currentCol] = "possibleMove"                  
                    break;
                
                
                case currentVale:

                    console.log("current property is :",checkersProperty[turnVar])
                    // console.log("inside this: ",currentRow,currentCol)
                    // console.log("original: ", row,col)

                    let jumpRow = currentRow + (currentRow - row)
                    let jumpCol = currentCol + (currentCol - col)

                   if (jumpRow <= (boardRowLen-1) && jumpCol <= (boardColLen-1))
                   {
                        console.log("jump row and col: ",jumpRow,jumpCol)
                
                        if(boardArrVal[jumpRow][jumpCol] === "null")
                        {
                            boardArrVal[jumpRow][jumpCol] = "possibleMove"   
                            jumpedOver.push([currentRow, currentCol])
                        }
                   }
                    
                    break;
                
            }
        }
        prevClickRow = row
        prevClickCol = col    
    }
   
// }

}


