var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

class Player {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.rotation = 0;
  }

  draw() {
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.rotation);
    ctx.translate(-this.position.x, -this.position.y);
    ctx.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2, false);

    // ctx.fillStyle = "red";
    // ctx.fillRect(this.position.x, this.position.y, 100, 100);
    ctx.beginPath();

    ctx.moveTo(this.position.x + 30, this.position.y);
    ctx.lineTo(this.position.x - 10, this.position.y - 10);
    ctx.lineTo(this.position.x - 10, this.position.y + 10);
    ctx.closePath();

    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.restore();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

class Projectile {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 5;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      Math.PI * 2,
      false
    );
    ctx.closePath;
    ctx.fillStyle = "white";
    ctx.fill();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

class Asteroid {
  constructor({ position, velocity, radius }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      Math.PI * 2,
      false
    );
    ctx.closePath;
    ctx.strokeStyle = "white";
    ctx.stroke();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

const player = new Player({
  position: { x: innerWidth / 2, y: innerHeight / 2 },
  velocity: { x: 0, y: 0 },
});

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

const SPEED = 6;
const ROTATIONAL_SPEED = 0.05;
const FRICTION = 0.99;
const PROJECTILE_SPEED = 10;

const asteroids = [];
const projectiles = [];

window.setInterval(() => {
  const index = Math.floor(Math.random() * 4);

  let x, y;
  let vx, vy;
  let radius = 50 * Math.random() + 10;

  switch (index) {
    case 0:
      x = 0 - radius;
      y = Math.random() * canvas.height;
      vx = 1;
      vy = 0;
      break;
    case 1:
      x = Math.random() * canvas.width;
      y = canvas.height + radius;
      vx = 0;
      vy = -1;
      break;
    case 2:
      x = canvas.width + radius;
      y = Math.random() * canvas.height;
      vx = -1;
      vy = 0;
      break;
    case 3:
      x = Math.random() * canvas.width;
      y = 0 - radius;
      vx = 0;
      vy = 1;
      break;
  }

  asteroids.push(
    new Asteroid({
      position: {
        x: x,
        y: y,
      },
      velocity: {
        x: vx,
        y: vy,
      },
      radius,
    })
  );
}, 2500);

function animate() {
  window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  player.update();

  // projectiles
  for (let i = projectiles.length - 1; i >= 0; i--) {
    const projectile = projectiles[i];
    projectile.update();

    // remove projectile if it goes off screen
    if (
      projectile.position.x + projectile.radius < 0 ||
      projectile.position.x - projectile.radius > innerWidth ||
      projectile.position.y + projectile.radius < 0 ||
      projectile.position.y - projectile.radius > innerHeight
    ) {
      projectiles.splice(i, 1);
    }
  }

  // asteroids
  for (let i = asteroids.length - 1; i >= 0; i--) {
    const asteroid = asteroids[i];
    asteroid.update();

    if (
      asteroid.position.x + asteroid.radius < 0 ||
      asteroid.position.x - asteroid.radius > innerWidth ||
      asteroid.position.y + asteroid.radius < 0 ||
      asteroid.position.y - asteroid.radius > innerHeight
    ) {
      asteroid.splice(i, 1);
    }
  }

  // player
  if (player.position.x > innerWidth) {
    player.position.x = 0;
  } else if (player.position.x < 0) {
    player.position.x = innerWidth;
  }

  if (player.position.y > innerHeight) {
    player.position.y = 0;
  } else if (player.position.y < 0) {
    player.position.y = innerHeight;
  }

  if (keys.w.pressed) {
    player.velocity.x = Math.cos(player.rotation) * SPEED;
    player.velocity.y = Math.sin(player.rotation) * SPEED;
  } else if (!keys.w.pressed) {
    player.velocity.x *= FRICTION;
    player.velocity.y *= FRICTION;
  }

  if (keys.d.pressed) {
    player.rotation += ROTATIONAL_SPEED;
  } else if (keys.a.pressed) {
    player.rotation -= ROTATIONAL_SPEED;
  }
}

animate();

window.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "KeyW":
      keys.w.pressed = true;
      break;
    case "KeyA":
      keys.a.pressed = true;
      break;
    case "KeyD":
      keys.d.pressed = true;
      break;
    case "Space":
      projectiles.push(
        new Projectile({
          position: {
            x: player.position.x + Math.cos(player.rotation) * 30,
            y: player.position.y + Math.sin(player.rotation) * 30,
          },
          velocity: {
            x: Math.cos(player.rotation) * PROJECTILE_SPEED,
            y: Math.sin(player.rotation) * PROJECTILE_SPEED,
          },
        })
      );
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.code) {
    case "KeyW":
      keys.w.pressed = false;
      break;
    case "KeyA":
      keys.a.pressed = false;
      break;
    case "KeyD":
      keys.d.pressed = false;
      break;
  }
});
