import Ball from './Ball.js'
import Paddle from './paddle.js'


const ball = new Ball(document.getElementById('ball'));
const playerPaddle = new Paddle(document.getElementById('player-paddle'));
const computerPaddle = new Paddle(document.getElementById('computer-paddle'));
const playerScore = document.getElementById('player-score');
const computerScore = document.getElementById('computer-score');

let lastTime;
function update(time){
    if(lastTime!=null){
        const delta = time-lastTime;
        //Update Code
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
        computerPaddle.update(delta, ball.y);
        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))

        document.documentElement.style.setProperty("--hue", hue+delta*0.01)
        if(isGameOver()) handleGameOver();
    }
    lastTime = time;
    window.requestAnimationFrame(update); // update function is called infinitely if something on screen is allowed to change
}
document.addEventListener('mousemove', e=>{
    playerPaddle.position = (e.y/window.innerHeight) * 100;
})
function isGameOver(){
    const rect = ball.rect();
    return rect.right >= window.innerWidth|| rect.left<=0;
}
function handleGameOver(){
    const rect = ball.rect();
    if(rect.right>= window.innerWidth){
       playerScore.textContent = parseInt(playerScore.textContent)+1; 
    }else{
        computerScore.textContent = parseInt(computerScore.textContent)+1; 
    }
    ball.reset();
    computerPaddle.reset();
}
window.requestAnimationFrame(update); //if something on screen is allowed to change then it calls update function