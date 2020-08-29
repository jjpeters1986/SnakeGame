const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const score = document.getElementById('score')
let squares = []
let currentSnake = [2,1,0]
let direction = 1
const width = 10
let appleIndex = 0;
let currentScore = 0;
let interval = 1000;
const speed = 0.9;
let timerId = 0;

function createGrid() {
    //create 100 of these elements with a for loop
    for (let i=0; i < 100; i++) {
     //create element
    const square = document.createElement('div')
    //add styling to the element
    square.classList.add('square')
    //put the element into our grid
    grid.appendChild(square)
    //push it into a new squares array    
    squares.push(square)
    }
}
createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))

function startGame() {
    //remove the snake
    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    //remove the apple
    squares[appleIndex].classList.remove("apple");
    clearInterval(timerId);
    currentSnake = [2,1,0];
    direction = 1;
    appleIndex = 0;
    currentScore = 0;
    score.textContent = currentScore;
    interval = 1000;
    generateApples();
    //add the class of snake to our new currentSnake
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    timerId = setInterval(move, interval)
}

function move() {
    if (
        //if snake has hit bottom
        (currentSnake[0] + width >= 100 && direction === width) ||
        //if snake has hit right wall
        (currentSnake[0] % 10 === 9 && direction === 1) ||
        //if snake has hit left wall
        (currentSnake[0] % 10 === 0 && direction === -1) ||        
        //if snake has hit top
        (currentSnake[0] - 10 < 0 && direction === -width) ||
        //if snake runs into itself
        squares[currentSnake[0] + direction].classList.contains("snake")
    )
    return clearInterval(timerId)

    //remove last element from our currentSnake array
    const tail = currentSnake.pop()
    //remove styling from last element
    squares[tail].classList.remove('snake')
    //add square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction)

    //deal with snake head getting the apple
    if (currentSnake[0] === appleIndex) {
        //remove the class of apple
        squares[currentSnake[0]].classList.remove("apple");
        //grow snake by adding class of snake to end
        squares[tail].classList.add("snake")
        //grow our snake array
        currentSnake.push(tail)
        //generate a new apple
        generateApples();
        //add one to the score
        currentScore++
        score.textContent = currentScore;
        //speed up our snake
        interval = interval * speed;
        timerId = setInterval(move, interval)
    }


    //add styling so we can see it
    squares[currentSnake[0]].classList.add('snake')
}


function generateApples() {
    do {
        //generate a random number
        appleIndex = Math.floor(Math.random() * 100);
        //will generate another number if it lands on part of the snake
    } while (squares[appleIndex].classList.contains("snake"))
    squares[appleIndex].classList.add("apple")
}
generateApples();




// 39 is right arrow
// 38 is for the up arrow
// 37 is for the left arrow
// 40 is for the down arrow

function control(e) {
    if (e.keyCode === 39) {
        console.log('right pressed')
        direction = 1;
        console.log(direction)
        console.log(currentSnake[0])
    } else if (e.keyCode === 38) {
        console.log('up pressed')
        direction = -width;
        console.log(direction)
        console.log(currentSnake[0])
    } else if (e.keyCode === 37) {
        console.log('left pressed')
        direction = -1;
        console.log(direction)
        console.log(currentSnake[0])
    } else if (e.keyCode === 40) {
        console.log('down pressed')
        direction = +width;
        console.log(direction)
        console.log(currentSnake[0])
    }
}
document.addEventListener('keydown', control)

//Start / Restart the game
startButton.addEventListener("click", startGame)


//Stop snake from going off the grid
    //Left Wall: snakeHead % 10 === 0
    //Right Wall: snakeHead % 10 === 9
    //Top Wall: snakeHead - 10 < 0
    //Bottom Wall: snakeHead >= 90  (+10 >= 100)
