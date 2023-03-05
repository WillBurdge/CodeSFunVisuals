const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let ballX = canvas.width / 5;
let ballY = canvas.height / 10;
let ballRadius =5;
let ballSpeedX = 5;
let ballSpeedY = -9;
let paddleHeight = 75;
let paddleWidth = 10;
let player1Score = 0;
let player2Score = 0;
let player1Y = (canvas.height - paddleHeight) / 2;
let player2Y = (canvas.height - paddleHeight) / 2;
let keysDown = {};

document.addEventListener('keydown', event => {
  keysDown[event.keyCode] = true;
});

document.addEventListener('keyup', event => {
  delete keysDown[event.keyCode];
});

function gameLoop() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
    ballSpeedY = -ballSpeedY;
  }

  if (ballX - ballRadius < paddleWidth) {
    if (ballY > player1Y && ballY < player1Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
    } else {
      player2Score++;
      resetBall();
    }
  } else if (ballX + ballRadius > canvas.width - paddleWidth) {
    if (ballY > player2Y && ballY < player2Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
    } else {
      player1Score++;
      resetBall();
    }
  }


  player1Y = Math.max(0, Math.min(player1Y, canvas.height - paddleHeight));
  player2Y = Math.max(0, Math.min(player2Y, canvas.height - paddleHeight));

   ctx.beginPath();
   ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * .75);
   ctx.arc(ballY, ballX, ballRadius, 0, Math.PI * .75);
   ctx.fillStyle = 'green';
   ctx.fill();
   ctx.closePath();
 

   
 
   if (player1Score >= 5 || player2Score >= 5) {
     player1Score = 0;
     player2Score = 0;
     resetBall();
   }
 
   requestAnimationFrame(gameLoop);
 }
 
 function resetBall() {
   ballX = canvas.width / 2;
   ballY = canvas.height / 2;
   ballSpeedX = -ballSpeedX;
   ballSpeedY = -ballSpeedY;
 }
 
 requestAnimationFrame(gameLoop);
 
