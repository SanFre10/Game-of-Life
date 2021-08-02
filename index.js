gridDiv = document.getElementById("gridDiv");

rows = document.getElementById("rows");
cols = document.getElementById("columns");

rows.addEventListener("change", (e) => {
    createGrid(rows.value, cols.value);
});
cols.addEventListener("change", (e) => {
    createGrid(rows.value, cols.value);
});

window.onload = () => {
    createGrid(rows.value, cols.value);
};

clear = document.getElementById("clear");
clear.addEventListener("click", () => {
    toggleRunning(pause);
    createGrid(rows.value, cols.value);
});

borderBtn = document.getElementById("toggleGrid");
var gridBorders = borderBtn.classList.contains("activated") ? "1px solid black" : "none";
var running = false;

borderBtn.addEventListener("click", () => {
    borderBtn.classList.toggle("activated");
    gridBorders = borderBtn.classList.contains("activated") ? "1px solid black" : "none";
    updateBorders();
});

function createGrid(r, c) {
    gridDiv.innerHTML = "";
    var grid = document.createElement("table");
    for (var i = 0; i < r; i++) {
        var tr = grid.appendChild(document.createElement("tr"));
        for (var j = 0; j < c; j++) {
            var cell = tr.appendChild(document.createElement("td"));
            cell.classList.add("celula");
            cell.id = j + " " + i;
            cell.style = "border:" + gridBorders + ";";
            cell.addEventListener("click", (e) => {
                if (!running) {
                    e.target.classList.toggle("live");
                }
            });
        }
    }
    gridDiv.appendChild(grid);
}

playBtn = document.getElementById("play");
playBtn.addEventListener("click", () => {
    toggleRunning();
});

function toggleRunning(state = "") {
    if (state == "") {
        if (running) {
            pause();
        } else {
            start();
        }
    } else {
        state(); //Puede ser pause() o start()
    }
    updateBorders();
}
function start() {
    running = true;
    playBtn.innerHTML = "Pause";
    gridBorders = borderBtn.classList.contains("activated") ? "1px solid black" : "none";
    tick();
}
function pause() {
    running = false;
    playBtn.innerHTML = "Play";
    gridBorders = borderBtn.classList.contains("activated") ? "1px solid black" : "none";
}
function updateBorders() {
    var Cells = document.querySelectorAll(".celula");
    for (var i = 0; i < Cells.length; i++) {
        Cells[i].style.border = gridBorders;
    }
}
color = document.getElementById("color");
color.addEventListener("change", (e) => {
    console.log("hola")
    document.documentElement.style.setProperty("--color", e.target.value);
});
//Funcionamiento
function getNeighbours(cell) {
    var neighbours = 0;
    relpos = [-1, 0, 1];
    var x = cell.id.split(" ")[0];
    var y = cell.id.split(" ")[1];
    for (i in relpos) {
        for (j in relpos) {
            var cellId = parseInt(x) + relpos[i] + " " + (parseInt(y) + relpos[j]);
            neighbourCell = document.getElementById(cellId);
            if (neighbourCell && neighbourCell.classList.contains("live") && cellId != cell.id) {
                neighbours++;
            }
        }
    }
    return neighbours;
}
speed = document.getElementById("speed");
function tick() {
    var Cells = document.querySelectorAll(".celula");
    //Obtiene celulas vecinas
    for (var i = 0; i < Cells.length; i++) {
        Cells[i].setAttribute("vecinas", getNeighbours(Cells[i]));
    }
    /*
    Reglas
        1-Una celula sigue viva si tiene exactamente 2 o 3 celulas vecinas vivas
        2-Una celula muerta revive si tiene 3 celulas vecinas vivas
    */
    for (var i = 0; i < Cells.length; i++) {
        //Regla 1
        if (Cells[i].classList.contains("live")) {
            if (Cells[i].getAttribute("vecinas") != "2" && Cells[i].getAttribute("vecinas") != "3") {
                Cells[i].classList.remove("live");
            }
        }
        //Regla 2
        else if (parseInt(Cells[i].getAttribute("vecinas")) == 3) {
            Cells[i].classList.add("live");
        }
    }
    //"Frames"
    if (running) {
        setTimeout(tick, 1000 / parseInt(speed.value));
    }
}
