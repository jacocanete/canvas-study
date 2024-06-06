var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

window.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "w":
      rocket.dy += -1;
      break;
    case "s":
      rocket.dy += 1;
      break;
  }
});

window.addEventListener("keyup", function (event) {
  switch (event.key) {
    case "w":
    case "s":
      rocket.dy -= -1;
      break;
  }
});

function Rocket(x, y, dx, dy) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.width = 25;
  this.height = 25;
  this.color = "red";
  this.lineWidth = "2px";
  this.angle = Math.atan2(this.dy, this.dx);

  this.draw = function () {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = ctx.lineWidth;

    ctx.save();

    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.width, this.y);
    ctx.lineTo(this.x + this.width / 2, this.y - this.height);
    ctx.closePath();
    ctx.stroke();
  };

  this.update = function () {
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  };
}

var rocket = new Rocket(200, 200, 0, 0);

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  rocket.update();

  // x axis
  ctx.beginPath();
  ctx.strokeStyle = "grey";
  ctx.lineWitdh = 2;
  ctx.moveTo(0, innerHeight / 2);
  ctx.lineTo(innerWidth, innerHeight / 2);
  ctx.closePath();
  ctx.stroke();

  // y axis
  ctx.beginPath();
  ctx.strokeStyle = "grey";
  ctx.lineWitdh = 2;
  ctx.moveTo(innerWidth / 2, 0);
  ctx.lineTo(innerWidth / 2, innerHeight);
  ctx.closePath();
  ctx.stroke();
}

animate();
