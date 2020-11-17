function randomOrNot() {
    let random = true;
    if (random) {
        randomLab();
    } else {
        chooseLab()
    }
}

function randomLab() {
    let randomCase = Math.floor(Math.random() * Object.keys(labyrinthes).length + 1);
    let randomEx = Math.floor(Math.random() * 2 + 1);
    new_labyrinthe(randomCase, labyrinthes[randomCase]["ex-" + randomEx])
}

function chooseLab() {
    new_labyrinthe(4, labyrinthes["4"]["ex-0"]);
}

function new_labyrinthe(taille, ex) {

    //effacer le labyrinthe 
    let div = document.getElementById('grid-container');
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }

    // recréer le labyrinthe 
    document.getElementById("grid-container").style.gridTemplateColumns = "repeat(" + taille + ", 100px)";
    document.getElementById("grid-container").style.gridTemplateRows = "repeat(" + taille + ", 100px)";


    //haut droit bas gauche 
    for (let i = 0; i < ex.length; i++) {
        let borderstyle = "";

        for (let j = 0; j < ex[i]["walls"].length; j++) {

            if (ex[i]["walls"][j]) {
                borderstyle = borderstyle + "solid ";
            } else {
                borderstyle = borderstyle + "none ";
            }
        }

        console.log(borderstyle, "celule num " + ex[i]["posX"] + "_" + ex[i]["posY"]);
        let element = document.createElement("DIV");
        element.id = "cellule_" + ex[i]["posX"] + "_" + ex[i]["posY"];
        if (i == ex.length - 1) {
            element.style.backgroundColor = "tomato"
        }
        element.style.borderStyle = borderstyle;
        element.style.borderColor = "rgb(233, 30, 99)";
        document.getElementById("grid-container").appendChild(element);

    }
}
