const canvas: HTMLCanvasElement = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
const box: number = 20;
let snake: { x: number, y: number }[] = [];
snake[0] = { x: 10 * box, y: 10 * box };
let direction: string = 'RIGHT';
let food: { x: number, y: number } = {
  x: Math.floor(Math.random() * 20) * box,
  y: Math.floor(Math.random() * 20) * box,
};

document.addEventListener('keydown', directionControl);

function directionControl(event: KeyboardEvent): void {
  if (event.key === 'ArrowLeft' && direction !== 'RIGHT') {
    direction = 'LEFT';
  } else if (event.key === 'ArrowUp' && direction !== 'DOWN') {
    direction = 'UP';
  } else if (event.key === 'ArrowRight' && direction !== 'LEFT') {
    direction = 'RIGHT';
  } else if (event.key === 'ArrowDown' && direction !== 'UP') {
    direction = 'DOWN';
  }
}

function collision(newHead: { x: number, y: number }, snakeArray: { x: number, y: number }[]): boolean {
  for (let i = 0; i < snakeArray.length; i++) {
    if (newHead.x === snakeArray[i].x && newHead.y === snakeArray[i].y) {
      return true;
    }
  }
  return false;
}

function draw(): void {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? 'green' : 'white';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = 'red';
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, box, box);

  let snakeX: number = snake[0].x;
  let snakeY: number = snake[0].y;

  if (direction === 'LEFT') snakeX -= box;
  if (direction === 'UP') snakeY -= box;
  if (direction === 'RIGHT') snakeX += box;
  if (direction === 'DOWN') snakeY += box;

  if (snakeX === food.x && snakeY === food.y) {
    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box,
    };
  } else {
    snake.pop();
  }

  let newHead: { x: number, y: number } = {
    x: snakeX,
    y: snakeY,
  };

  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= canvas.width ||
    snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
  }

  snake.unshift(newHead);
}

let game: number = setInterval(draw, 100);
