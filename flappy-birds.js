var canvasWidth = '600';
var canvasHeight = '400';

var obstacles = [];
var birdPositionX = canvasWidth / 2;
var birdPositionY = canvasHeight / 2;
var birdSize = 30;
var gravity = 1.2;
var score = 0;

// p5 lifecycle function
function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background('white');
  noStroke();
}

// p5 lifecycle function
function draw() {
  background('white');

  if (hasCollision()) {
    noLoop();
  }

  updateObstacles();
  updateBird();
  updateScore();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    birdPositionY -= 25;
  }
}

function updateBird() {
  fill('red');
  rect(birdPositionX, birdPositionY, birdSize, birdSize);

  if (birdPositionY <= (canvasHeight - birdSize)) {
    birdPositionY += gravity;
  }
}

function updateObstacles() {
  if (frameCount % 200 === 0) {
    obstacles.push(createObstacle());
  }

  obstacles.forEach(function(obstacle) {
    fill('black');
    rect(obstacle.position, 0, obstacle.width, obstacle.height); 

    fill('white');
    rect(obstacle.position, obstacle.gapPosition, obstacle.width, obstacle.gapSize);

    obstacle.position--;
  });
}

function createObstacle() {
  var gapSize = 100;

  return {
    gapPosition: Math.random() * (canvasHeight - 100),
    gapSize: gapSize,
    height: canvasHeight,
    position: canvasWidth,
    width: 10
  };
}

function hasCollision() {
  return obstacles.some(function(obstacle) {
    var hasSamePosition = obstacle.position === (birdPositionX + birdSize); 
    var gapEnd = obstacle.gapPosition + obstacle.gapSize;
    var isBirdInGap = birdPositionY >= obstacle.gapPosition && birdPositionY <= (gapEnd - birdSize);

    return hasSamePosition && !isBirdInGap;  
  });
}

function updateScore() {
  if (frameCount > 400 && (frameCount - 100) % 200 === 0) {
    score++;
  }

  textSize(16);
  fill('black');
  text('Score: ' + score, 0, 16);
}
