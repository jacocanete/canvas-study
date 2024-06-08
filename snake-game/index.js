// board
// var cellSize = 25;
// var rows = 20;
// var cols = 20;
// var grid;
// var ctx;

var grid;
var ctx;
var gameOver = false;

const board = {
  cellSize: 25,
  rows: 20,
  cols: 20,
};

// bitin

const snake = {
  x: board.cellSize * 5,
  y: board.cellSize * 5,
  dx: 0,
  dy: 0,
  body: [],
};

// pagkaon

const food = {
  x: 0,
  y: 0,
};

window.onload = () => {
  grid = document.getElementById("canvas");
  grid.height = board.cellSize * board.rows;
  grid.width = board.cellSize * board.cols;
  ctx = grid.getContext("2d");

  placeFood();
  document.addEventListener("keydown", moveSnake);
  animate();
};

const update = () => {
  console.table(snake);
  if (gameOver) {
    alert("Game Over :(");
    return;
  }

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, grid.width, grid.height);

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, board.cellSize, board.cellSize);

  if (snake.x === food.x && snake.y === food.y) {
    snake.body.push([food.x, food.y]);
    placeFood();
  }

  for (let i = snake.body.length - 1; i > 0; i--) {
    snake.body[i] = snake.body[i - 1];
  }

  if (snake.body.length) {
    snake.body[0] = [snake.x, snake.y];
  }

  ctx.fillStyle = "lime";
  snake.x += snake.dx * board.cellSize;
  snake.y += snake.dy * board.cellSize;
  ctx.fillRect(snake.x, snake.y, board.cellSize, board.cellSize);
  for (let i = 0; i < snake.body.length; i++) {
    ctx.fillRect(
      snake.body[i][0],
      snake.body[i][1],
      board.cellSize,
      board.cellSize
    );
  }

  // TERRIBLE OUT OF BOUNDS CHECKING
  if (snake.x < 0) {
    snake.x = board.cellSize * board.cols;
  } else if (snake.x >= board.cellSize * board.cols) {
    snake.x = -board.cellSize;
    if (snake.dy === 1) {
      snake.y = snake.y - board.cellSize * 2;
      snake.dy = 0;
      snake.dx = 1;
    } else if (snake.dy === -1) {
      snake.y = snake.y + board.cellSize * 2;
      snake.dy = 0;
      snake.dx = 1;
    }
  } else if (snake.y < 0) {
    snake.y = board.cellSize * board.rows;
    if (snake.dx === 1) {
      snake.x = snake.x - board.cellSize * 2;
      snake.dx = 0;
      snake.dy = -1;
    } else if (snake.dx === -1) {
      snake.x = snake.x + board.cellSize * 2;
      snake.dx = 0;
      snake.dy = -1;
    }
  } else if (snake.y >= board.cellSize * board.rows) {
    snake.y = -board.cellSize;
  }

  for (let i = 0; i < snake.body.length; i++) {
    if (snake.x === snake.body[i][0] && snake.y === snake.body[i][1]) {
      gameOver = true;
    }
  }
};

const animate = () => {
  update();
  setInterval(update, 1000 / 10);
};

function moveSnake(event) {
  switch (event.code) {
    case "KeyW":
      if (snake.dy != 1) {
        snake.dy = -1;
        snake.dx = 0;
      }
      break;
    case "KeyA":
      if (snake.dx != 1) {
        snake.dx = -1;
        snake.dy = 0;
      }
      break;
    case "KeyD":
      if (snake.dx != -1) {
        snake.dx = 1;
        snake.dy = 0;
      }
      break;
    case "KeyS":
      if (snake.dy != -1) {
        snake.dy = 1;
        snake.dx = 0;
      }
      break;
  }
}

function placeFood() {
  food.x = Math.floor(Math.random() * board.cols) * board.cellSize;
  food.y = Math.floor(Math.random() * board.rows) * board.cellSize;
}
