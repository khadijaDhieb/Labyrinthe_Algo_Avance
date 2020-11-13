
function affiche_lab() {
    new_labyrinthe(3, labyrinthes["3"]["ex-0"]);
}

function new_labyrinthe(taille, ex) {

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

        console.log(borderstyle, "celule num " + i);
        let element = document.createElement("DIV");
        console.log(ex.length -1);
        element.className = "cellule_"+ i;
        if(i == ex.length-1){
            element.className = "cellule_end";}
        
        element.style.borderStyle = borderstyle;
        document.getElementById("grid-container").appendChild(element);
    }
}

console.log(labyrinthes["3"]["ex-0"]);