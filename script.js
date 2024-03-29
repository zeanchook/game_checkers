  /*----- constants -----*/


  /*----- state variables -----*/


  /*----- cached elements  -----*/
  let bodyMain = document.querySelector("body")
  let containerDiv = document.querySelector(".container")

  /*----- event listeners -----*/


  /*----- functions -----*/
  init()
  function init()
  {
    
    for (let i = 0 ;i < 9;i++)
    {
        let createMainDivRow = document.createElement("div");
        let createMainDivRowClassName = "row";
        createMainDivRow.setAttribute("class",createMainDivRowClassName);   
        containerDiv.append(createMainDivRow)   
    }

    for(let row = 0 ; row < containerDiv.childNodes.length;row++)
    {
        for(let col = 0 ; col < 9 ; col++)
        {
            let createMainDivCol = document.createElement("div");
            let createMainDivColClassName = "col";
            if(row%2===0)
            {   
                if(col%2===0)
                {
                    createMainDivColClassName = createMainDivColClassName + " " + "blackbckgrd";
                    createMainDivCol.setAttribute("class",createMainDivColClassName);
                }
                else{
                    createMainDivColClassName = createMainDivColClassName + " " + "whitebckgrd";
                    createMainDivCol.setAttribute("class",createMainDivColClassName);
                }    
            }
            else
            {
                if(col%2===1)
                {
                    createMainDivColClassName = createMainDivColClassName + " " + "blackbckgrd";
                    createMainDivCol.setAttribute("class",createMainDivColClassName);
                }
                else{
                    createMainDivColClassName = createMainDivColClassName + " " + "whitebckgrd";
                    createMainDivCol.setAttribute("class",createMainDivColClassName);     
                }     
            }
            containerDiv.childNodes[row].append(createMainDivCol);   
        }
    }
    // render();
  }

  function render()
  {
    renderBoard();
    renderMessage();
  }


  
