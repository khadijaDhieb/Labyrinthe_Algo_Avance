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
        new_labyrinthe(8, labyrinthes["8"]["ex-0"]);
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
function get_DFS_or_BFS() {
    let x = document.getElementById("myOption").value;
    return x;
}
function resolve_labyrinthe() {
    let DFS_or_BFS_choice = get_DFS_or_BFS();
    let t0 = performance.now();
    let pile_file = [];
    cellStart = arrayLab[0];
    console.log(arrayLab[0])
    pile_file.push(cellStart);
    visited(cellStart);
    while (pile_file.length > 0) {
        let cellActual;
        if (DFS_or_BFS_choice === "pop") {
            cellActual = pile_file.pop()
        } else if (DFS_or_BFS_choice === "shift") {
            cellActual = pile_file.shift()
        }
        visited(cellActual);
        if (lastCase(cellActual)) { return; }
        let listCellsAroundCellActualWithNoWalls = allCellsAroundCellActualWithNoWalls(cellActual);
        for (let w = 0; w < listCellsAroundCellActualWithNoWalls.length; w++) {
            if (!listCellsAroundCellActualWithNoWalls[w].isVisited) {
                pile_file.push(listCellsAroundCellActualWithNoWalls[w]);
            }
        }

    }
    console.log("durée résolution avec votre choix de méthode : " + (t0 - performance.now()));
    return false;
}

/*============= Code initial : methode DFS et BFS =====================
function playDFS() {
    //retourne le temps écoulé depuis l'origine de temps.
    let t0 = performance.now();
    DFS(arrayLab[0]);
    console.log("fonction DFS : " + (t0 - performance.now()));
}

function playBFS() {
    let t0 = performance.now();
    BFS(arrayLab[0]);
    console.log("fonction BFS : " + (t0 - performance.now()));
}

*/
/*==============CODE SE DEPLACANT DANS LE LABYRINTHE=================*/
function DFS(cellStart) {
    /* stack : une pile d'assiettes
    * la seule assiette directement accessible est la dernière assiette 
    *qui a été déposée sur la pile.
    *on utilise pop pour supprimer et recuperer la derniere assiette */
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

function BFS(cellStart) {
    /* file ou queue : une file d'attente devant un magasin pour décrire une file de données.
    *on ajoute des éléments à une extrémité de la file 
    *et on supprime des éléments à l'autre extrémité. 
    * on utilise shift pour supprimer et recuperer le premier element entré */
    let queue = [];
    queue.push(cellStart);
    visited(cellStart);
    while (queue.length > 0) {
        let cellActual = queue.shift()
        visited(cellActual);
        if (lastCase(cellActual)) { return; }
        let listCellsAroundCellActualWithNoWalls = allCellsAroundCellActualWithNoWalls(cellActual);
        for (let w = 0; w < listCellsAroundCellActualWithNoWalls.length; w++) {
            if (!listCellsAroundCellActualWithNoWalls[w].isVisited) {
                queue.push(listCellsAroundCellActualWithNoWalls[w]);
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