// My constants
let inputDir = {x:0 , y:0};
const foodSound = new Audio ('music/sound2.mp3');
const gameoverSound = new Audio('music/sound3.mp3');
const moveSound = new Audio('music/sound1.mp3');
const musicSound = new Audio('music/sound3.mp3');
let lasttime = 0;
let speed = 10;
let score = 0;
let snakeArr = [
    {x: 13 , y: 15}
]
food = {x: 7,y: 7};


// Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lasttime)/1000 < 1/speed){
        return;
    }
    lasttime = ctime;
    gameEngine();
}

function isCollide(snake){
    //return false;
    // Collision with itself
    for(let i = 1; i<snakeArr.length ; i++){
        if(snake[i].x===snake[0].x  && snake[i].y===snake[0].y){
            return true;
        }
    }

    // Collision into wall
    if( snake[0].x >= 18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y <= 0){
        return true;
    }
    return false;
}

function gameEngine(){
    // updating the snake array and food

    if(isCollide(snakeArr)){
       // gameoverSound.play();
        musicSound.pause();
        inputDir = {x: 0 , y: 0};
        alert("Game over. Press any key to start again");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0;
    }

    // If you have eaten the food , increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        score += 1;
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a+(b-a)*Math.random()) , y: Math.round(a+(b-a)*Math.random())}
    }

    // Moving the snake
    for(let i = snakeArr.length-2;i>=0;i--){
        snakeArr[i+1] = {...snakeArr[i]}
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add('snake');
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

    //Display the food

}







// Main logic

window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputDir = {x: 0, y: 1} //Start the game
   // moveSound.play();
    switch (e.key){
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});