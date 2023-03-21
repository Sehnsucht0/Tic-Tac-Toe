const cells = Array.from(document.querySelectorAll(".cell"));
const matchResults = document.querySelector(".match-results");
let move = "O";
cells.forEach(cell => cell.addEventListener("click", playerClick));

function playerClick (e) {
    playersMove (e.target);
    const rowsColumns = getRowsColumns();
    let result = checkWinner (e.target, rowsColumns, cells);
    if (result == "end") matchResults.textContent = "It's a draw.";
    else if (result) 
    {
        gameOver(e);
        matchResults.textContent = `${e.target.textContent} wins.`;
    }
}

function playersMove (cell)
{
    cell.textContent = move;
    cell.removeEventListener("click", playerClick);
    if (move == "O") move = "X";
    else move = "O";
}

function checkWinner (cell, rowsColumns, cellsArray) {
    const attributes = cell.getAttributeNames();
    let row = "row" + cell.getAttribute(attributes[1]);
    let column = "column" + cell.getAttribute(attributes[2]);
    let diagonal = null, result = null;
    if (attributes.length > 3)
    {
        diagonal = "diagonal" + cell.getAttribute(attributes[3]);
    }

    result = rowsColumns[row].every(element => element.textContent === rowsColumns[row][0].textContent);
    if (result == true) return result;

    result = rowsColumns[column].every(element => element.textContent === rowsColumns[column][0].textContent);
    if (result == true) return result;

    if (diagonal != null) result = rowsColumns[diagonal].every(element => element.textContent === rowsColumns[diagonal][0].textContent);
    if (result == true) return result;

    if (cell.getAttribute(attributes[0]) == "cell center") 
    {
        result = rowsColumns.diagonalleft.every(element => element.textContent === rowsColumns.diagonalleft[0].textContent);
        if (result == true) return result;

        result = rowsColumns.diagonalright.every(element => element.textContent === rowsColumns.diagonalright[0].textContent);
        if (result == true) return result;
    }

    if (cellsArray.every(element => element.textContent != "")) return "end";

    return result;
}

function gameOver (e) {
    cells.forEach(cell => cell.removeEventListener("click", playerClick));
}

function getRowsColumns () {
    const rowsColumns = {
        row1 : Array.from(document.querySelectorAll('[data-row = "1"]')),
        row2 : Array.from(document.querySelectorAll('[data-row = "2"]')),
        row3 : Array.from(document.querySelectorAll('[data-row = "3"]')),
        column1 : Array.from(document.querySelectorAll('[data-column = "1"]')),
        column2 : Array.from(document.querySelectorAll('[data-column = "2"]')),
        column3 : Array.from(document.querySelectorAll('[data-column = "3"]')),
        diagonalleft : Array.from(document.querySelectorAll('[data-diagonal = "left"]')),
        diagonalright : Array.from(document.querySelectorAll('[data-diagonal = "right"]')), 
    }
    const centerCell = document.querySelector(".center");
    rowsColumns.diagonalleft.splice(1, 0, centerCell);
    rowsColumns.diagonalright.splice(1, 0, centerCell);
    return rowsColumns;
}