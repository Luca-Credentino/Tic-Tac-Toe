//require
let winningCombo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [1,4,7],
    [0,3,6],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

const boxs = document.querySelectorAll("td");
const playerXPoints = document.querySelector(".x_points");
const playerCirclePoints = document.querySelector(".o_points");
const startBtn = document.querySelector(".startgame");
const resetPointsBtn = document.querySelector(".resetpoint");
const X_CLASS = 'x'
const CIRLCE_CLASS = 'circle'
let circleTurn
let pointsX = 0
let pointsCircle = 0


startBtn.addEventListener("click", () => {
    startBtn.innerText = "X turn";
    startGame()
})

resetPointsBtn.addEventListener("click", ()=>{
    location.reload();
})

function startGame (){
boxs.forEach(cell => {
    cell.addEventListener("click", Click, {once: true})
})}

function Click(event){
    const cell = event.target
    const currentClass = circleTurn ? CIRLCE_CLASS : X_CLASS
    placeMarks(cell, currentClass)
    swapTurn()
    if(checkWin(currentClass)) {
        if(currentClass == 'x'){
            pointsX++;
            playerXPoints.innerText = pointsX;
            removeMarks();
            startBtn.innerText = "Start game";
        }else if(currentClass == "circle"){
            pointsCircle++;
            playerCirclePoints.innerHTML = pointsCircle;
            removeMarks()
            startBtn.innerText = "Start game";
        }else if (isDraw()){
            removeMarks();
        }
    }
}

function placeMarks(cell, currentClass){
    cell.classList.add(currentClass)
}
function removeMarks(){
    boxs.forEach(cell => {
        cell.classList.remove('x')
        cell.classList.remove('circle')
    })
}

function swapTurn(){
    circleTurn = !circleTurn
    if(!circleTurn){
        startBtn.innerText = "X turn"
    }else{
        startBtn.innerText = "Circle turn"
    }
}

function checkWin (currentClass) {
    return winningCombo.some(combination => {
        return combination.every(index => {
            return boxs[index].classList.contains(currentClass);
        })
    })
}

function isDraw(){
    return [...boxs].every(cell => {
      if(cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRLCE_CLASS))
        return true
    })
}