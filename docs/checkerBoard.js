import { GetBoardFromApi, NewGame, SendClicktoApi } from "./svc.js";

// console.log(await NewGame())
// console.log(await GetBoardFromApi())

const PlacePiecesOnBoard = async () => {
    var boardInfo = await GetBoardFromApi()
    // console.log(boardInfo)
    for (var i = 0; i < boardInfo.piece.length; i++) {
        // console.log(boardInfo.piecePos[i])
        // console.log(boardInfo.piece[i])
        var row = boardInfo.piecePos[i].row
        var col = boardInfo.piecePos[i].column
        var tile = document.getElementById(`${row},${col}`)
        var image = document.createElement("img")

        image.classList.add("checkerImg")
        if (boardInfo.piece[i] == null) {
            tile.replaceChildren()
            image.src = ""
            tile.appendChild(image)
        }
        //Update this when you get to super pieces
        else if (boardInfo.piece[i].color == 1) {
            tile.replaceChildren()
            image.src = "./images/black-circle-svgrepo-com.svg"
            tile.appendChild(image)
        }
        else if (boardInfo.piece[i].color == 2) {
            tile.replaceChildren()
            image.src = "./images/red-circle-svgrepo-com.svg"
            tile.appendChild(image)
        }
        //event listeners here
        tile.addEventListener("click", (e) => {
        e.stopImmediatePropagation()
           var position = e.target.id
           var splitPosition = position.split(',')
           var row = splitPosition[0]
           var column = splitPosition[1]
           console.log(row + "," + column)
           
           SendClicktoApi(row, column)
           PlacePiecesOnBoard()
        })
    }
}

function CreateBoard() {
    var center = document.createElement('center')
    var board = document.getElementById("board")
    // Create a table element 
    var ChessTable = document.createElement('table')
    ChessTable.id = "chessTable";
    for (var i = 0; i < 8; i++) {

        // Create a row 
        var tr = document.createElement('tr')
        for (var j = 0; j < 8; j++) {

            // Create a cell 
            var td = document.createElement('td')
            td.id = `${i},${j}`
            if ((i + j) % 2 == 0) {

                // Create a class attribute for all white cells 
                td.setAttribute('class', 'cell whitecell')
                tr.appendChild(td)
            }

            else {

                // Create a class attribute for all black cells 
                td.setAttribute('class', 'cell blackcell')

                // Append the cell to its row 
                tr.appendChild(td)
            }
        }

        // Append the row 
        ChessTable.appendChild(tr);
    }
    // center.appendChild(ChessTable); 
    center.appendChild(ChessTable);

    ChessTable.setAttribute('cellspacing', '0');
    // ChessTable.setAttribute('width', '270px'); 
    board.appendChild(center);
}

CreateBoard()
PlacePiecesOnBoard()