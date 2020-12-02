let arrayLab;

function randomOrNot() {
    let random = false;
    let content = document.getElementById('grid-container');
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
    if (random) {
        let randomSize = Math.floor(Math.random() * Object.keys(labyrinthes).length + 3);
        let randomEx = Math.floor(Math.random() * 3);
        new_labyrinthe(randomSize, labyrinthes[randomSize]["ex-" + randomEx]);
    } else {
        new_labyrinthe(5, labyrinthes["5"]["ex-0"]);
    }
}

/*===============CODE GENERANT LE LABYRINTHE=========================*/

function new_labyrinthe(size, ex) {
    arrayLab = new Array(ex.length);

    document.getElementById("grid-container").style.gridTemplateColumns = "repeat(" + size + ", 50px)";
    document.getElementById("grid-container").style.gridTemplateRows = "repeat(" + size + ", 50px)";

    //haut droit bas gauche
    for (let i = 0; i < ex.length; i++) {
        let borderstyle = "";
        arrayLab[i] = {};
        for (let j = 0; j < ex[i]["walls"].length; j++) {

            if (ex[i]["walls"][j]) {
                borderstyle = borderstyle + "solid ";
            } else {
                borderstyle = borderstyle + "none ";
            }
        }
        arrayLab[i]["posX"] = ex[i]["posX"];
        arrayLab[i]["posY"] = ex[i]["posY"];
        arrayLab[i]["walls"] = ex[i]["walls"];
        arrayLab[i]["isVisited"] = false;

        let element = document.createElement("DIV");
        element.id = "cellule" + ex[i]["posX"] + "_" + ex[i]["posY"];
        if (i === ex.length - 1) {
            element.style.backgroundColor = "tomato"
        }
        element.style.borderStyle = borderstyle;
        element.style.borderColor = "rgb(210,10,122)";
        document.getElementById("grid-container").appendChild(element);
    }
}
/*=============================Résoudre le labyrinthe=======================*/
function playDFS() {
    //  let t0 = performance.now();
    DFS(arrayLab[0]);
    // console.log("fonction DFS : " + (t0 - performance.now()));
}


/*==============CODE SE DEPLACANT DANS LE LABYRINTHE=================*/
function DFS(cellStart) {
    let stack = [];
    stack.push(cellStart);
    visited(cellStart);
    while (stack.length > 0) {
        let cellActual = stack.pop()
        visited(cellActual);
        if (lastCase(cellActual)) { return; }
        let listCellsAroundCellActualWithNoWalls = allCellsAroundCellActualWithNoWalls(cellActual);
        for (let w = 0; w < listCellsAroundCellActualWithNoWalls.length; w++) {
            if (!listCellsAroundCellActualWithNoWalls[w].isVisited) {
                stack.push(listCellsAroundCellActualWithNoWalls[w]);
            }
        }

    }
    return false;
}

function visited(cellActual) {
    cellActual.isVisited = true;
    let idCase = "cellule" + cellActual["posX"] + "_" + cellActual["posY"];
    document.getElementById(idCase).style.backgroundColor = "rgb(62,234,207)";
}

/*
* you need cellActual
* cellActual is "v"
* we checked i
* if i === 0 so the move is up
* if i === 1 so the move is righr
* This move is based on CSS logic for assign border : up right down left*/
function allCellsAroundCellActualWithNoWalls(cellActual) {

    let result = [];
    for (let i = 0; i < cellActual.walls.length; i++) {
    /* on cherche les cases autour de la case courante.
    si le border style est false càd pas de wall , on prend la case */
        if (!cellActual.walls[i]) {
            switch (i) {
                case 0: result.push(getCaseByCoordinate(cellActual.posX - 1, cellActual.posY));//haut
                    break;
                case 1: result.push(getCaseByCoordinate(cellActual.posX, cellActual.posY + 1));//droite
                    break;
                case 2: result.push(getCaseByCoordinate(cellActual.posX + 1, cellActual.posY));//bas
                    break;
                case 3: result.push(getCaseByCoordinate(cellActual.posX, cellActual.posY - 1));//gauche
            }
        }
    }
    return result;
}

function getCaseByCoordinate(x, y) {
    for (let i = 0; i < arrayLab.length; i++) {
        if (x === arrayLab[i].posX && y === arrayLab[i].posY) {
            return arrayLab[i];
        }
    }
    return null;
}

function lastCase(currentCase) {
    return arrayLab.indexOf(currentCase) === arrayLab.length - 1

}