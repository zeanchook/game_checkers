  /*----- constants -----*/
  const rowMAX = 10;
  const colMAX = 10;
  let checkersProperty = 
  {
    "1": "blackChess",
    "-1": "whiteChess",
  }
  
  
//   console.log(boardArrVal)
 
  /*----- state variables -----*/
  let boardArrVal = [];
  const boardRowLen = 6;
  const boardColLen = 6;

  let prevClickRow ;
  let prevClickCol;

  let turnVar; 

  /*----- cached elements  -----*/
  let bodyMain = document.querySelector("body")
  let containerDiv = document.querySelector(".container")

  

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

  function render()
  {
    renderBoard();
    // renderMessage();
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

function clearPossibleMove(inputRow)
{
    boardArrVal
    for(let i = 0 ; i < boardArrVal[inputRow].length ; i ++)
    {
        if(boardArrVal[inputRow][i] === "possibleMove")
        {
            boardArrVal[inputRow][i] = "null";
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
        boardArrVal[chkrRowClick][chkrColClick] = boardArrVal[prevClickRow][prevClickCol]
        boardArrVal[prevClickRow][prevClickCol] = "null"
        clearPossibleMove(chkrRowClick);
    }
        

    


    // console.log("here",turnVar)
    if(chkrClsClick === checkersProperty[turnVar])
    {

            computePosMoves(turnVar,chkrRowClick,chkrColClick)

        turnVar *= -1;
    }

    
    render()
}

    
        
    // console.log(1===1 ? 3 : 2)
console.log(checkersProperty[-1],turnVar)

function computePosMoves (turns,row,col)
{
    let rowMath;
    turns === 1 ? rowMath = -1 : rowMath = 1;
    

    for(let i = -1 ; i < 2 ; i++)
    {
        // console.log(containerDiv.children[row + rowMath].children[col + i].className)

        let currentCol = col + i;

        currentCol > (boardColLen-1) ? currentCol = (boardColLen - 1): currentCol < 0 ? currentCol = 0 : currentCol

    
        if (! containerDiv.children[row + rowMath].children[currentCol].className.includes("blackbckgrd"))
        {
            console.log(boardArrVal[row + rowMath][currentCol])
            // if ((boardArrVal[row + rowMath][col + i] === "null"))
            // {
                
            // }


            let tempVar = (boardArrVal[row + rowMath][currentCol])
            switch (tempVar)
            {
                case "null":
                    boardArrVal[row + rowMath][currentCol] = "possibleMove"
                    break;
            }
        }
       
            prevClickRow = row
            prevClickCol = col          
    }
   
}




