document.addEventListener("DOMContentLoaded", ()=>{
    let squares = document.querySelectorAll(".grid");
    let startBtn = document.querySelector(".startBtn");
    let scoreDisplay = document.querySelector(".score");
    let highScoreDisplay = document.querySelector(".HighScore");
    const gridWidth = 10;
    let speed = 0.9;
    let interval = 0;
    let intervalTime = 0;
    let direction = 1;
    let currentSnake = [2,1,0];
    let appleIndex = 0;
    let currentIndex = 0;
    let highScore = localStorage.getItem("storedScore");
    highScoreDisplay.textContent= highScore;


    


    function randomApple (){
        do{
            appleIndex = Math.floor(Math.random()*(gridWidth * gridWidth));
        }while(squares[appleIndex].classList.contains("snake"))
        squares[appleIndex].classList.add("apple");
    }
    function changeDirection (event){
        if (event.keyCode === 39) {
            direction = 1;
        } //snake goes right
        else if(event.keyCode === 38){
            direction = -gridWidth;
        } //snake goes up
        else if (event.keyCode === 37){
            direction = -1;
        } //snake goes left, reverses really
        else if (event.keyCode === 40){
            direction = gridWidth;
        } //sanke goes down;
    }
    function startGame (){
        currentSnake.forEach(index => squares[index].classList.remove("snake"));
        squares[appleIndex].classList.remove("apple");
        clearInterval(interval);
        score = 0;
        direction = 1;
        scoreDisplay.textContent = score;
        intervalTime = 1000;
        currentSnake = [2, 1, 0];
        currentIndex = 0;
        currentSnake.forEach(index => squares[index].classList.add("snake"));
        randomApple();
        interval = setInterval(moveOutcome, intervalTime);
    }

    function moveOutcome(){
       if (
            (currentSnake[0] + gridWidth >= (gridWidth * gridWidth) && direction === gridWidth)
             || (currentSnake[0] - gridWidth < 0 && direction === -gridWidth)
             || (currentSnake[0] % gridWidth >= (gridWidth - 1) && direction === 1 )
             || (currentSnake[0] % gridWidth === 0 && direction === -1)
             || (squares[currentSnake[0] + direction].classList.contains("snake"))
        )
        {
            if (score > highScore){
                highScore = score;
                highScoreDisplay.textContent = highScore;
                localStorage.setItem("storedScore", highScore);
            }  
            return clearInterval(interval);
        }
        currentSnake.unshift(currentSnake[0] + direction);
        console.log(currentSnake.length);  
        squares[currentSnake[0]].classList.add("snake");
        const tail = currentSnake.pop();
        squares[tail].classList.remove("snake");
        if (squares[currentSnake[0]].classList.contains("apple")){
            currentSnake.push(tail);
            squares[tail].classList.add("snake");
            squares[currentSnake[0]].classList.remove("apple");
            score++;
            scoreDisplay.textContent = score;
            randomApple();
            clearInterval(interval);
            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutcome, intervalTime);
        }
    }
    document.addEventListener("keyup", changeDirection);
    startBtn.addEventListener("click", startGame);
});

