import { GetBoardFromApi, GetGameStatus, GetLeaderBoard, NewGame, SendClicktoApi } from "./svc.js";

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
        image.draggable = true

        image.classList.add("checkerImg")
        if (boardInfo.piece[i] == null) {
            tile.replaceChildren()
            image.src = ""
            tile.appendChild(image)
        }
        //Update this when you get to super pieces
        else if (boardInfo.piece[i].color == 1 && boardInfo.piece[i].type == 0) {
            tile.replaceChildren()
            image.src = "./images/black-circle-svgrepo-com.svg"

            tile.appendChild(image)


        }
        else if (boardInfo.piece[i].color == 2  && boardInfo.piece[i].type == 0) {
            tile.replaceChildren()
            image.src = "./images/red-circle-svgrepo-com.svg"
            tile.appendChild(image)

        }
        else if (boardInfo.piece[i].color == 1 && boardInfo.piece[i].type == 1) {
            tile.replaceChildren()
            image.src = "./images/black-500-in-a-black-circle-with-an-outline-svgrepo-com.svg"

            tile.appendChild(image)

        }
        else if (boardInfo.piece[i].color == 2  && boardInfo.piece[i].type == 1) {
            tile.replaceChildren()
            image.src = "./images/red-500-in-a-red-circle-with-an-outline-svgrepo-com.svg"
            tile.appendChild(image)
        }
        

        //event listeners here
        tile.addEventListener("click", async (e) => {
            e.stopImmediatePropagation()
            // console.log("here")
            var position = e.target.id
            var splitPosition = position.split(',')
            var row = splitPosition[0]
            var column = splitPosition[1]
            // console.log(row + "," + column)

            var currentTile = document.getElementById(`${row},${column}`)
            // currentTile.classList.add("highlight")


            await SendClicktoApi(row, column)
            await DisplayCurrentPlayer()
            await DisplayWinner()
            await PlacePiecesOnBoard()
        })

        image.addEventListener("click", async (e) => {
            // console.log(e.target.parentElement)
            e.stopImmediatePropagation()
            // console.log("here")
            var position = e.target.parentElement.id
            var splitPosition = position.split(',')
            var row = splitPosition[0]
            var column = splitPosition[1]
            // console.log(row + "," + column)

            var currentTile = document.getElementById(`${row},${column}`)
            // currentTile.classList.add("highlight")


            await SendClicktoApi(row, column)
            await DisplayCurrentPlayer()
            await DisplayWinner()
            await PlacePiecesOnBoard()
        })

        image.addEventListener("dragstart", async (e) => {
            var position = e.target.parentElement.id
            var splitPosition = position.split(',')
            var row = splitPosition[0]
            var column = splitPosition[1]

            await SendClicktoApi(row, column)
            await DisplayCurrentPlayer()
            await DisplayWinner()
            await PlacePiecesOnBoard()
        })


        tile.addEventListener("dragover", (e) => {
            e.preventDefault()
        })

        tile.addEventListener("drop", async (e) => {
            e.stopImmediatePropagation()
            // console.log("dropped on " + e.target.id)
            var position = e.target.id
            var splitPosition = position.split(',')
            var row = splitPosition[0]
            var column = splitPosition[1]

            await SendClicktoApi(row, column)
            await DisplayCurrentPlayer()
            await DisplayWinner()
            await PlacePiecesOnBoard()
        })


    }
}

const DisplayWinner = async() => {
    var gameStatus = await GetGameStatus()
    var gameResult = gameStatus.gameState.result
    var resultbox = document.getElementById("winnerContainer")
    if (gameResult != null)
    {
        resultbox.classList.remove("hidden")
        // console.log(gameResult)

        console.log(gameStatus.gameState.result)
        var winner = document.getElementById("winner")
        var player = DeterminePlayer(gameResult.winner)
        winner.innerText = `${player}`
    }
    else
    {
        resultbox.classList.add("hidden")
    }
}

const DisplayCurrentPlayer = async () => {
    var playerBox = document.getElementById("currentPlayer")
    var data = await GetGameStatus()
    // console.log(data.gameState.currentPlayer)
    var player = await DeterminePlayer(data.gameState.currentPlayer)
    playerBox.innerText = `${player}'s turn`
    // console.log(player)
    

}

const DeterminePlayer = async (playerNum) => {
    if (playerNum == 1)
    {
        return `Black`
    }
    else if (playerNum == 2)
    {
        return `Red`
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

const ResetGame = async () => {
    var reset = document.getElementById("ResetGame")
    reset.addEventListener("submit", async (e) => {
        e.preventDefault()
        await NewGame()
        await PlacePiecesOnBoard()
    })
}

await CreateBoard()
await ResetGame()
await PlacePiecesOnBoard()

// console.log(await GetLeaderBoard())
// console.log(await GetGameStatus())
