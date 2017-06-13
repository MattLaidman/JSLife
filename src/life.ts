class Board {

    private table: HTMLElement;
    private cells: Array<Array<HTMLElement>>;
    private exists = false;

    constructor(private width: number, private height: number) {
        // Create the board
        this.table = document.createElement("table");
        this.cells = new Array<Array<HTMLElement>>();
        for (let i = 0 ; i < height ; i++) {
            this.table.appendChild(this.makeRow(width));
        }
        document.getElementById("jslife").appendChild(this.table);
    }

    // Public methods

    public updateBoard() {
        // Create temp array to store new states
        let tempStates = Array<Array<string>>();
        for (let i = 0 ; i < this.height ; i++) {
            tempStates.push(new Array<string>(this.width))
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
                let count = 0;
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
                } else {
                    if (count == 3) {
                        tempStates[i][j] = "alive";
                    }
                }
            }
        }
        // Copy over new states
        for (let i = 0 ; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                this.cells[i][j].className = tempStates[i][j];
            }
        }
    }

    public deleteBoard() {
        this.table.remove();
    }

    // Private methods
    
    private makeRow(size: number): HTMLElement {
        // Create the row
        let row = document.createElement("tr");
        let cellRow = new Array<HTMLElement>();
        for (let i = 0 ; i < size ; i++) {
            // Create a cell
            // Initially, all cells are dead
            let cell = document.createElement("td");
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
    } 
}

function startLife() {
    isAlive = true;
    lifeButton.removeEventListener("click", startLife);
    lifeButton.addEventListener("click", stopLife);
    lifeButton.setAttribute("value", "Stop");
    clearInterval(lifeLoop);
    lifeLoop = setInterval(function(){board.updateBoard();}, speed);
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

function updateSpeed(sliderVal: number) {
    speed = sliderVal;
    if (isAlive) {
        clearInterval(lifeLoop);
        lifeLoop = setInterval(function(){board.updateBoard();}, speed);
    }
}

function calculateWidth(): number {
    return Math.floor((document.getElementById("jslife").scrollWidth)/7);
}

function calculateHeight(): number {
    return Math.floor((document.getElementById("jslife").scrollHeight - 20)/7);
}

// Create and load the game
let isAlive = false;
let lifeLoop; // Loop for updating
let board = new Board(calculateWidth(), calculateHeight());


let lifeButton = document.getElementById("lifeButton");
let resetButton = document.getElementById("resetButton");
let speedSlider = <HTMLInputElement>document.getElementById("speedSlider");
let speed = parseInt(speedSlider.value);

lifeButton.addEventListener("click", startLife);
resetButton.addEventListener("click", reset);
speedSlider.addEventListener("input", function() {updateSpeed(parseInt(this.value));});