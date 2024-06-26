  /*----- constants -----*/
  const rowMAX = 50;
  const colMAX = 50;
  const rowMIN = 2;
  const colMIN = 2;
  
  /*----- state variables -----*/
  let boardArrVal = [];
  let boardRowLen = 10;
  let boardColLen = 10;
  let removeBefore = 0;
  let prevClickRow = 0 ;
  let prevClickCol = 0;
  let numOfCheckers = {};
  let playersMove = {};
  let winner;
  let jumpedOver = [];
  let currentPlayerMoves = 0;
  let turnVar;
  let jumpBef = 0;
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
  let playersName =
  {
    "1": "Player 1",
    "-1": "Player 2"
  }

  /*----- cached elements  -----*/
  //   main body
  let bodyMain = document.querySelector("body")
  let clicksound = document.querySelector("#clicksound")
  let chesssound = document.querySelector("#chesssound")
  chesssound.playbackRate = 1.5;

  //   Game page
  let gamePagePiecesDiv = document.querySelector(".gamepagePieces")
  let gamePageDiv = document.querySelector(".gamepage")
  let gamePageMsgDiv = document.querySelector(".gamepageMsg")
  let gamePageMainButton = document.querySelector(".mainpage")
  let zoominButton = document.querySelector(".zoomin")
  let zoomoutButton = document.querySelector(".zoomout")
  let settings = document.querySelector(".settings")
  let boardColor = document.querySelector(".colorpicker")
  let boardColor1 = document.querySelector("#colorpicker1")
  let boardColor2 = document.querySelector("#colorpicker2")
  let zoombutton = document.querySelector(".zoombutton")
  
  // startpage
  let startPageDiv = document.querySelector(".startpage")
  let resetButton = document.querySelector(".startover")
  let startButton = document.querySelector(".startpagebutton")
  
  // namepage
  let namepageDiv = document.querySelector(".namepage")
  let namePageInputBox1 = namepageDiv.children[0].children[0].children[0].children[0]
  let namePageInputBox2 = namepageDiv.children[0].children[1].children[0].children[0]
  let playButton = document.querySelector(".playbutton")
  let modeSelection = document.querySelector(".namepage-label").children
  let namepageCustoms = document.querySelector(".namepageCustoms")
  let namepageCusRows = document.querySelector(".namepageCusRows")
  let namepageCusCols = document.querySelector(".namepageCusCols")
  let namepageMsg = document.querySelector(".namepageMsg")
  modeSelection[1].addEventListener("change",showHideCustom)
  zoominButton.addEventListener("click",zoomin)
  zoomoutButton.addEventListener("click",zoomout)
  

  /*----- event listeners -----*/
  gamePageDiv.addEventListener("click",userMoves);
  resetButton.addEventListener("click",init);
  startButton.addEventListener("click",goNamePage);
  playButton.addEventListener("click",startGame)
  gamePageMainButton.addEventListener("click",startPage)
  settings.addEventListener("click",gamesettings)
  boardColor.addEventListener("click",hideShowBoardColor)
  boardColor1.addEventListener("change",colorizeBackground)
  boardColor2.addEventListener("change",colorizeBackground)
  zoombutton.addEventListener("click",zoomButton)
  namePageInputBox1.addEventListener("click",clearField)
  namePageInputBox2.addEventListener("click",clearField)

  namepageDiv.style.display = "none";
  startPageDiv.style.display = "flex";
  gamePageDiv.style.display = "none";
  gamePageMsgDiv.style.display = "none";
  gamePagePiecesDiv.style.display = "none";
  namepageCustoms.style.display = "none"
  settings.style.display = "none"
  gamePageMainButton.style.display = "none"
  zoominButton.style.display = "none"
  zoomoutButton.style.display = "none"
  resetButton.style.display = "none"
  boardColor.style.display = "none";
  boardColor1.style.display = "none";
  boardColor2.style.display = "none";
  zoombutton.style.display = "none";
  
  /*----- functions -----*/
  init()

  function init()
  {
    let checkersLength = gamePageDiv.children.length;
    if (checkersLength !== 0)
    {for(let i = 0 ; i < checkersLength ; i++) {gamePageDiv.children[0].remove()}}
    clicksound.play();
    initBoard();

    for (let i = 0 ;i < boardRowLen;i++)
    {
        let createMainDivRow = document.createElement("div");
        let createMainDivRowClassName = "row";
        createMainDivRow.setAttribute("class",createMainDivRowClassName);   
        gamePageDiv.append(createMainDivRow);   
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
    winner = "null";
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
        gamePageMsgDiv.children[0].setAttribute("class",checkersProperty[turnIdx])
        gamePageMsgDiv.children[1].innerHTML =  playersName[turnIdx] + " turn! "
    }
    else if (Math.abs(winner) === 1)
    {
        gamePageMsgDiv.children[0].setAttribute("class",checkersProperty[winner])
        gamePageMsgDiv.children[1].innerHTML =  playersName[winner] + " Wins ! "
    }
    else if (winner === "Tie ! ")
    {
        gamePageMsgDiv.innerHTML = "Its a Tie !";
    }
    
    let piecesUpdate = gamePagePiecesDiv.children;
    for(let i = 0 ; i< piecesUpdate.length;i++)
    {
        for(let items in checkersProperty)
        {
            if(piecesUpdate[i].children[0].className === checkersProperty[items])
            {
                if (numOfCheckers[checkersProperty[items]] !== 0)
                {
                    piecesUpdate[i].children[0].style.display = "flex"
                    piecesUpdate[i].children[1].style.display = "flex"
                    piecesUpdate[i].children[1].innerHTML = numOfCheckers[checkersProperty[items]]
                }
                else
                {
                    piecesUpdate[i].children[0].style.display = "none"
                    piecesUpdate[i].children[1].style.display = "none"
                }
                
            }
        }
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
    boardArrVal.forEach(row => {row.forEach((cell, index, arr) => {if (cell === undefined) {arr[index] = "null";}});});
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
        if(isNaN(chkrRowClick) === false && isNaN(chkrRowClick) === false)
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
    }

    if (chkrClsClick === "possibleMove")
    {
        removeBefore = 0;
        let removeCheckerRow = Math.floor((chkrRowClick + prevClickRow) / 2)
        let removeCheckerCol = Math.floor((chkrColClick + prevClickCol) / 2)
        let internalTurn = turnVar
        Math.abs(internalTurn) === 2 ? internalTurn = internalTurn/2: internalTurn = internalTurn*2
        for(let i = 0; i < jumpedOver.length;i++)
        {
            if ((removeCheckerRow === jumpedOver[i][0]) && (removeCheckerCol === jumpedOver[i][1]))
            {
                if (boardArrVal[jumpedOver[i][0]][jumpedOver[i][1]] === checkersProperty[turnVar * -1] || boardArrVal[jumpedOver[i][0]][jumpedOver[i][1]] === checkersProperty[internalTurn * -1])
                {
                    boardArrVal[jumpedOver[i][0]][jumpedOver[i][1]] = "null"
                } 
                delete jumpedOver[i];
                jumpedOver.pop()
                removeBefore = 1;
            }
        }

        boardArrVal[chkrRowClick][chkrColClick] = boardArrVal[prevClickRow][prevClickCol];
        boardArrVal[prevClickRow][prevClickCol] = "null";
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
        if (removeBefore)
        {          
            let checkMoves = computePosMoves(turnVar,chkrRowClick,chkrColClick,1)

            if (checkMoves !== 0)
            {
                turnVar = turnVar;
                jumpBef = 1;
            }
            else{
                turnVar *= -1;
                jumpBef = 0;
            }         
        }
        else if(removeBefore === 0)
        {
            turnVar *= -1;
            jumpBef = 0;
        }
        currentPlayerMoves = 1;  
        render();     
    }
        
    if (chkrClsClick === checkersProperty[turnVar] && jumpBef === 0)
    {
        chesssound.play();
        boardArrVal.forEach( x => x.includes("possibleMove") ? clearPossibleMove() : 0)
        prevClickRow = chkrRowClick;
        prevClickCol = chkrColClick;
        computePosMoves(turnVar,chkrRowClick,chkrColClick,0)
    }
    if(jumpBef ===0)
    {
        render();
    }
    
}

function computePosMoves (turns,row,col,kingsMove)
{
    let length = 1;
    let initial = -1;
    let possibleMove = 0;

    //**
    Math.abs(turns) === 2 ? (length = 2, initial = -1)
    : turns === 1 ? (length = 0, initial = -1)
    : turns === -1 ? (length = 2, initial = 1)
    : undefined;

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

                Math.abs(internalTurn) === 1 ? internalTurn *= 2: internalTurn /= 2;
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


function goNamePage (event)
{
    clicksound.play()
    startPageDiv.style.display = "none";
    namepageDiv.style.display = "flex";
    gamePageDiv.style.display = "none";
    gamePageMsgDiv.style.display = "none";
    gamePagePiecesDiv.style.display = "none";
    namepageMsg.innerHTML = ""
}
function startPage (event)
{
    clicksound.play()
    gamePageDiv.style.display = "none";
    gamePageMsgDiv.style.display = "none";
    gamePagePiecesDiv.style.display = "none";
    startPageDiv.style.display = "flex";

    gamePageMainButton.style.display = "none";
    resetButton.style.display = "none";
    settings.style.display = "none";

    boardColor.style.display = "none";
    boardColor1.style.display = "none";
    boardColor2.style.display = "none";
    zoominButton.style.display = "none";
    zoomoutButton.style.display = "none";
    zoombutton.style.display = "none";
}
 
function startGame(event)
{
    init();
    clicksound.play()
let inputBox1 = namePageInputBox1.value;
let inputBox2 = namePageInputBox2.value;
let gameMode = modeSelection[1].value;

if (event.target.className === "playbutton")
{
    clicksound.play()
    if (inputBox1 === "" || inputBox2 === "")
    {
        namePageInputBox1.value = namePageInputBox2.value = "Cannot be blank!"
        namePageInputBox1.style.color = namePageInputBox2.style.color = "red"
    }
    else if ((inputBox1 !== "Cannot be blank!" || inputBox2 !== "Cannot be blank!") && getgameMode(gameMode) !== false)
    {
        playersName[1] = inputBox1
        playersName[-1] = inputBox2
        init();
        gamePageDiv.style.display = gamePageMsgDiv.style.display = gamePagePiecesDiv.style.display = gamePageMainButton.style.display = resetButton.style.display = "flex";
        startPageDiv.style.display = namepageDiv.style.display = "none";
        settings.style.display = "";
    }    
}

    for(let i = 1 ; i <= 2; i++)
    {
        if (event.target.className === ("namepageClearButton" + i))
        {
            if ( i === 1)
            {
                namePageInputBox1.value = ""
                namePageInputBox1.style.color = "black"
            }
            else
            {
                namePageInputBox2.value = ""
                namePageInputBox2.style.color = "black"
            }
        }   
    }
}

  const getgameMode = (inputGameMode) =>
  {
    let customRows = namepageCusRows.value
    let customCols = namepageCusCols.value

    let gameMode = {
        "standard": { row: 8, col: 8 },
        "fastgame": { row: 6, col: 6 },
        "ultrafastgame": { row: 4, col: 4 },
        "slowgame": { row: 10, col: 10 },
        "ultraslowgame": { row: 20, col: 20 },
    }
    if (inputGameMode === "custom")
    {
        if (customRows === "" || customCols === "") 
        {
            namepageCusRows.style.borderColor = "red"
            namepageCusCols.style.borderColor = "red"
        }
        else{
            if (customRows < rowMIN)
            {
                namepageMsg.innerHTML = "The Minimum Rows Value is " + rowMIN;
                return false;
            }
            else if(customCols < colMIN)
            {
                namepageMsg.innerHTML = "The Minimum Column Value is " + colMIN;
                return false;
            }
            else if(customCols > colMAX)
            {
                namepageMsg.innerHTML = "The Maximum Column Value is " + colMAX;
                return false;
            }
            else if(customCols > rowMAX)
            {
                namepageMsg.innerHTML = "The Maximum Rows Value is " + rowMAX;
                return false;
            }
            else if (typeof(parseInt(customCols)) !== "number" || typeof(parseInt(customRows)) !== "number")
            {
                console.log(customCols,customRows)
                console.log(typeof(customCols),typeof(customRows))
                namepageMsg.innerHTML = "Please only input numbers!";
                return false;
            }
            else
            {
                boardRowLen = customRows
                boardColLen = customCols
                return true;
            }
            
        }
    }
    else
    {
        boardRowLen = gameMode[inputGameMode].row
        boardColLen = gameMode[inputGameMode].col
        return true;
    }   
  }

function showHideCustom(event)
{
    if (event.target.value === "custom")
    {
        namepageCustoms.style.display = "flex"
    }
    else
    {
        namepageCustoms.style.display = "none"
    }
}

function colorizeBackground()
{
    let blackBoard = document.querySelectorAll(".blackbckgrd")
    let whiteBoard = document.querySelectorAll(".whitebckgrd")
    for(let i = 0 ; i < blackBoard.length ; i++)
    {
        blackBoard[i].style.backgroundColor =  boardColor1.value;
    }
    for(let i = 0 ; i < whiteBoard.length ; i++)
    {
        whiteBoard[i].style.backgroundColor =  boardColor2.value;
    }
}

function hideShowBoardColor()
{
    clicksound.play()
    if(boardColor1.style.display === "none" || boardColor1.style.display === "none")
    {
        boardColor1.style.display = boardColor2.style.display = ""
    }
    else
    {
        boardColor1.style.display = boardColor2.style.display = "none"
    }
}
    
function zoomButton ()
{
    clicksound.play()
    if (zoominButton.style.display === "none" || zoomoutButton.style.display === "none")
    {
        zoominButton.style.display = zoomoutButton.style.display = "inline-block"
    }
    else
    {
        zoominButton.style.display = zoomoutButton.style.display = "none";
    }
}

function zoomin (e)
{
    let gamewidth = gamePageDiv.getBoundingClientRect().width
    clicksound.play()
    if(e.target.className)
    {
        gamePageDiv.getBoundingClientRect().width
        if(gamewidth < 600)
        {
            gamewidth += 100;
            gamewidth = gamewidth + "px"
            gamePageDiv.style.width = gamePageDiv.style.height = gamewidth;
        }
    };
}

function zoomout(e)
{
    clicksound.play()
    let gamewidth = gamePageDiv.getBoundingClientRect().width
    if(e.target.className)
    {
        if(gamewidth > 100)
        gamePageDiv.getBoundingClientRect().width
        gamewidth -= 100;
        gamewidth = gamewidth + "px"
        gamePageDiv.style.width = gamePageDiv.style.height = gamewidth;
    };
}

function gamesettings(event)
{
    clicksound.play()
    if((zoombutton.style.display === ""))
    {
        boardColor.style.display = boardColor1.style.display = boardColor2.style.display 
        = zoombutton.style.display = zoominButton.style.display = zoomoutButton.style.display = "none";
    }
    else{
        
        boardColor.style.display = zoombutton.style.display = "";
    }
     
}

function clearField (event)
{
    event.target.style.color = "black"
    event.target.value = ""
}





