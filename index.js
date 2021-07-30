gridDiv = document.getElementById("gridDiv")

rows = document.getElementById("rows")
cols = document.getElementById("columns")
    
rows.addEventListener("change", (e) => {createGrid(rows.value, cols.value)})
cols.addEventListener("change", (e) => {createGrid(rows.value, cols.value)})

function createGrid(r,c){
    gridDiv.innerHTML = "";

    var w = window.innerWidth;
    var h = window.innerHeight;
    var grid = document.createElement("table");
    grid.id = "grid"
    for (var i = 0; i < r; i++) {
        var tr = grid.appendChild(document.createElement("tr"));
        for (var j = 0; j < c; j++) {
            var cell = tr.appendChild(document.createElement("td"));
            cell.classList.add("celula")
            cell.id = (j + " " + i)
            cell.style = "border:1px solid;width:" + w/c + "px;height:"+h/r + "px;"
            cell.addEventListener("click", (e) => {
                toggleLife(e.target);
            });
        }
    }
    gridDiv.appendChild(grid);
}

function toggleLife(target){
    if(!running){
        if(target.classList.contains("live")){
            target.classList.remove("live")
        }
        else{
            target.classList.add("live")
        }
    }
}
running = false;

playBtn = document.getElementById("play")
playBtn.addEventListener("click", () => {
    var Cells = document.querySelectorAll(".celula");
    border = "0"
    if(running){
        running = false;
        playBtn.innerHTML = "Play";
        border = "1px solid black"

    }else{
        running = true;
        playBtn.innerHTML = "Pause";
        border = "0"
        tick();
    }
    //Toggle cells border
    for(var i = 0; i < Cells.length; i++){
        Cells[i].style.border = border;
    }
})

function getNeighbours(cell){
    var neighbours = 0;
    relpos = [-1,0,1]
    var x = cell.id.split(" ")[0];
    var y = cell.id.split(" ")[1];
    for(i in relpos){
        for(j in relpos){
            var cellId = (parseInt(x) + relpos[i]) + " " + (parseInt(y) + relpos[j])
            if(document.getElementById(cellId)){
                if(document.getElementById(cellId).classList.contains("live") && cellId != cell.id){
                    neighbours++;
                }
            }
        }
    }
    return neighbours;
}

function tick(){
    var Cells = document.querySelectorAll(".celula");
    //Obtiene celulas vecinas
    for(var i = 0; i < Cells.length; i++){
        Cells[i].setAttribute("vecinas", getNeighbours(Cells[i]))
    }
    /*
    Reglas
        1-Una celula sigue viva si tiene exactamente 2 o 3 celulas vecinas vivas
        2-Una celula muerta revive si tiene 3 celulas vecinas vivas
    */
    for(var i = 0; i < Cells.length; i++){
        //Regla 1
        if(Cells[i].classList.contains("live")){
            if(Cells[i].getAttribute("vecinas") != "2" && Cells[i].getAttribute("vecinas") != "3"){
                Cells[i].classList.remove("live");
            }
        }
        //Regla 2
        else{
            if(parseInt(Cells[i].getAttribute("vecinas")) == 3){
                Cells[i].classList.add("live");
            }
        }
    }
    //"Frames"
    if(running){
        speed = document.getElementById("speed")
        setTimeout(tick, 1000/parseInt(speed.value));
    }
}




