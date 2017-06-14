var Board = (function () {
    function Board(width, height) {
        this.width = width;
        this.height = height;
        this.exists = false;
        // Create the board
        this.table = document.createElement("table");
        this.cells = new Array();
        for (var i = 0; i < height; i++) {
            this.table.appendChild(this.makeRow(width));
        }
        document.getElementById("jslife").appendChild(this.table);
    }
    // Public methods
    Board.prototype.updateBoard = function () {
        // Create temp array to store new states
        var tempStates = Array();
        for (var i_1 = 0; i_1 < this.height; i_1++) {
            tempStates.push(new Array(this.width));
        }
        // Copy old states
        for (var i = 0; i < this.height; i++) {
            for (var j = 0; j < this.width; j++) {
                tempStates[i][j] = this.cells[i][j].className;
            }
        }
        // Apply update rules
        for (var i = 0; i < this.height; i++) {
            for (var j = 0; j < this.width; j++) {
                // Count neighbours
                var count = 0;
                if (this.cells[(i - 1 + this.height) % this.height][(j - 1 + this.width) % this.width].className == "alive") {
                    count++;
                }
                if (this.cells[(i - 1 + this.height) % this.height][j].className == "alive") {
                    count++;
                }
                if (this.cells[(i - 1 + this.height) % this.height][(j + 1) % this.width].className == "alive") {
                    count++;
                }
                if (this.cells[i][(j - 1 + this.width) % this.width].className == "alive") {
                    count++;
                }
                if (this.cells[i][(j + 1) % this.width].className == "alive") {
                    count++;
                }
                if (this.cells[(i + 1) % this.height][(j - 1 + this.width) % this.width].className == "alive") {
                    count++;
                }
                if (this.cells[(i + 1) % this.height][j].className == "alive") {
                    count++;
                }
                if (this.cells[(i + 1) % this.height][(j + 1) % this.width].className == "alive") {
                    count++;
                }
                // Apply rules
                if (this.cells[i][j].className == "alive") {
                    if (count < 2) {
                        tempStates[i][j] = "dead";
                    }
                    if (count > 3) {
                        tempStates[i][j] = "dead";
                    }
                }
                else {
                    if (count == 3) {
                        tempStates[i][j] = "alive";
                    }
                }
            }
        }
        // Copy over new states
        for (var i_2 = 0; i_2 < this.height; i_2++) {
            for (var j_1 = 0; j_1 < this.width; j_1++) {
                this.cells[i_2][j_1].className = tempStates[i_2][j_1];
            }
        }
    };
    Board.prototype.deleteBoard = function () {
        this.table.remove();
    };
    // Private methods
    Board.prototype.makeRow = function (size) {
        // Create the row
        var row = document.createElement("tr");
        var cellRow = new Array();
        for (var i = 0; i < size; i++) {
            // Create a cell
            // Initially, all cells are dead
            var cell = document.createElement("td");
            cell.className = "dead";
            // Attach click event
            cell.onclick = function () {
                this.className = (this.className == "dead" ? "alive" : "dead");
            };
            row.appendChild(cell);
            cellRow.push(cell);
        }
        this.cells.push(cellRow);
        return row;
    };
    return Board;
}());
function startLife() {
    isAlive = true;
    lifeButton.removeEventListener("click", startLife);
    lifeButton.addEventListener("click", stopLife);
    lifeButton.setAttribute("value", "Stop");
    clearInterval(lifeLoop);
    lifeLoop = setInterval(function () { board.updateBoard(); }, speed);
}
function stopLife() {
    isAlive = false;
    lifeButton.removeEventListener("click", stopLife);
    lifeButton.addEventListener("click", startLife);
    lifeButton.setAttribute("value", "Start");
    clearInterval(lifeLoop);
}
function reset() {
    stopLife();
    board.deleteBoard();
    board = new Board(calculateWidth(), calculateHeight());
}
function updateSpeed(sliderVal) {
    speed = sliderVal;
    if (isAlive) {
        clearInterval(lifeLoop);
        lifeLoop = setInterval(function () { board.updateBoard(); }, speed);
    }
}
function calculateWidth() {
    return Math.floor((document.getElementById("jslife").scrollWidth) / 7);
}
function calculateHeight() {
    return Math.floor((document.getElementById("jslife").scrollHeight - 20) / 7);
}
// Create and load the game
var isAlive = false;
var lifeLoop; // Loop for updating
var board = new Board(calculateWidth(), calculateHeight());
var lifeButton = document.getElementById("lifeButton");
var resetButton = document.getElementById("resetButton");
var speedSlider = document.getElementById("speedSlider");
var speed = parseInt(speedSlider.value);
lifeButton.addEventListener("click", startLife);
resetButton.addEventListener("click", reset);
speedSlider.addEventListener("input", function () { updateSpeed(parseInt(this.value)); });
