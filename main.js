var canvas, ctx;

// setup
window.onload = function() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  document.addEventListener("keydown", direction);
  // render 10 lần mỗi giây 
  var x = 20;
  setInterval(draw, 1000 / x);
};

var gridSize = (tileSize = 20);
var nextX = (nextY = 0);

// rắn
var defaultTailSize = 1;
var tailSize = defaultTailSize;
var snakeTrail = [];
var snakeX = (snakeY = 10);

// mồi
var appleX = (appleY = 15);

// draw
function draw() {
  const modeA = document.querySelector('#modeA')
  const modeB = document.querySelector('#modeB')

  // di chuyển vị trí kế tiếp
  snakeX += nextX;
  snakeY += nextY;
  
 // Chuyển chế độ
  if(modeA.checked === true) {
    if (snakeX < 0) {
    snakeX = gridSize - 1;
    }
    if (snakeX > gridSize - 1) {
      snakeX = 0;
    }
    if (snakeY < 0) {
      snakeY = gridSize - 1;
    }
    if (snakeY > gridSize - 1) {
      snakeY = 0;
    }
  }
  
  if(modeB.checked === true) {
    if(snakeX < 0 || snakeX > gridSize - 1 || snakeY < 0 || snakeY > gridSize - 1) {
      alert("Game Over")
      snakeX = (snakeY = 10);
      tailSize = defaultTailSize;
     };
   }
  

  
  
  // khi ăn mồi
  if (snakeX == appleX && snakeY == appleY) {
    tailSize++;
    appleX = Math.floor(Math.random() * gridSize);
    appleY = Math.floor(Math.random() * gridSize);
  }
  
  // nền
  ctx.fillStyle = "#1C1D24";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
 

  ctx.fillStyle = '#fff';

  for (var i = 0; i < snakeTrail.length; i++) {
    ctx.fillRect(
      snakeTrail[i].x * tileSize,
      snakeTrail[i].y * tileSize,
      tileSize,
      tileSize
    );
    
    // khi đụng vào thân
    if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
      tailSize = defaultTailSize;
    }
  }
  
  // vẽ mồi
  
  ctx.fillStyle = '#444';
  ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);
  //set snake trail
  snakeTrail.push({ x: snakeX, y: snakeY });
  while (snakeTrail.length > tailSize) {
    snakeTrail.shift();
  }
}

// control hướng đi
function direction(e) {
  switch (e.keyCode) {
    case 37:
      nextX = -1;
      nextY = 0;
      break;
    case 38:
      nextX = 0;
      nextY = -1;
      break;
    case 39:
      nextX = 1;
      nextY = 0;
      break;
    case 40:
      nextX = 0;
      nextY = 1;
      break;
  }
}


