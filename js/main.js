/* audio references */
/* 235510__ceberation__foam-hits.wav (https://freesound.org/people/ceberation/sounds/235510/) by https://freesound.org/people/ceberation/ is licensed under CC BY 3.0 (https://creativecommons.org/licenses/by/3.0/) */
let woodChopping = new Audio("../music/235510__ceberation__foam-hits.wav");
/* 240801__ryanconway__pickaxe-mining-stone.wav (https://freesound.org/people/ryanconway/sounds/240801/) by ryanconway (https://freesound.org/people/ryanconway/) is licensed under CC BY 3.0 (https://creativecommons.org/licenses/by/3.0/) */
let stoneCutting = new Audio("../music/240801__ryanconway__pickaxe-mining-stone.wav");

/* all variables that have interaction, aka dissapear and reappear.  */

/* for the guessing game */
let hoverBoxes = document.getElementsByClassName("hoverBox");
let randomNum = Math.floor(Math.random() * 5); /* 0 .. 4*/
/* all boxes that can be used as swords, now 1 */
let swordBoxes = document.getElementsByClassName("swordBox");
/* the swordBox that must be appended to the camera */
let newSwordBox = document.getElementsByClassName("newSwordBox")[0];
/* all boxes that can be cut with the sword */
let treeBoxes = document.getElementsByClassName("treeBox");
/* all boxes that can be used as axes, now 1 */
let axeBoxes = document.getElementsByClassName("axeBox");
/* the axeBox that must be appended to the camera */
let newAxeBox = document.getElementsByClassName("newAxeBox")[0];
/* all boxes that can be cut with the pickaxe */
let stoneBoxes = document.getElementsByClassName("stoneBox");
/* The wood variables needed for displaying amount of wood */
let wood = document.getElementsByClassName("wood")[0];
/* resetting to 0 */
wood.innerHTML = wood.dataset.amount;
/* the stone variables needed for displaying amount of stone */
let stone = document.getElementsByClassName("stone")[0];
/* resetting to 0 */
stone.innerHTML = stone.dataset.amount;

/* interaction of the guessing game, if you hover then a box becomes red */
for(let i = 0; i < hoverBoxes.length; i++){
    hoverBoxes[i].onmouseenter = (event) => {
        hoverBoxes[i].setAttribute("color","red");
    }
}

/* one box will be overwritten, it turns green and let the sword and axe appear */
hoverBoxes[randomNum].onmouseenter = (event)=>{
    hoverBoxes[randomNum].setAttribute("color","green");
    for(let i = 0; i < axeBoxes.length; i++){
        axeBoxes[i].setAttribute("visible",true);
    }
    for(let i = 0; i < swordBoxes.length; i++){
        swordBoxes[i].setAttribute("visible",true);
    }
}

/* what happens when you hover over the sword boxes (litteraly the sword(s)) */
for(let i = 0; i < swordBoxes.length; i++){
    swordBoxes[i].setAttribute("visible",false);
    swordBoxes[i].onmouseenter = (event) => {
        if(hoverBoxes[randomNum].getAttribute("color") === "green"){
            swordBoxes[i].remove();
            newSwordBox.setAttribute("visible", true);
            newAxeBox.setAttribute("visible", false);
        }
    }
}

/* what happens when you over the axe boxes (litteraly the axe(s))*/
for(let i = 0; i < axeBoxes.length; i++){
    axeBoxes[i].setAttribute("visible",false);
    axeBoxes[i].onmouseenter = (event) => {
        if(hoverBoxes[randomNum].getAttribute("color") === "green"){
            axeBoxes[i].remove();
            newAxeBox.setAttribute("visible", true);
            newSwordBox.setAttribute("visible", false);
        }
        
    }
}

/* if the sword is appended to the camera(visible) and the treebox you are hovering over is visible, cut it and up wood */
for(let i = 0; i < treeBoxes.length; i++){
    treeBoxes[i].onmouseenter = (event) => {
        if(newSwordBox.getAttribute("visible") == true && treeBoxes[i].getAttribute("visible") == true){
            treeBoxes[i].setAttribute("visible",false);
            wood.dataset.amount = parseInt(wood.dataset.amount) + 1;
            wood.innerHTML = wood.dataset.amount;
            woodChopping.play();
        }
    }
}

/* if the axe is appended to the camera(visible) and the stonebox you are hovering over is visible, cut it and up stone */
for(let i = 0; i < stoneBoxes.length; i++){
    stoneBoxes[i].onmouseenter = (event) => {
        if(newAxeBox.getAttribute("visible") == true && stoneBoxes[i].getAttribute("visible") == true){
            stoneBoxes[i].setAttribute("visible",false);
            stone.dataset.amount = parseInt(stone.dataset.amount) + 3;
            stone.innerHTML = stone.dataset.amount;
            stoneCutting.play();
        }
    }
}