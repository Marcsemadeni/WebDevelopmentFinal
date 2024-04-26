import { GetMessage } from "./svc.js";

// console.log(await GetMessage()) doesn't work no more :/
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