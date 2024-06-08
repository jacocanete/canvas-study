// Box width
var bw = 900;
// Box height
var bh = 900;
// Padding
var p = 10;

// Cell width
var cw = 30;

// Cell height
var ch = 30;

var canvas = document.getElementById("canvas1");
canvas.width = bw + p * 2;
canvas.height = bh + p * 2;

var context = canvas.getContext("2d");
function drawBoard() {
  // Vertical Lines
  for (var x = 0; x <= bw; x += cw) {
    context.moveTo(0.5 + x + p, p);
    context.lineTo(0.5 + x + p, bh + p);
  }

  // Horizontal Lines
  for (var x = 0; x <= bh; x += ch) {
    context.moveTo(p, 0.5 + x + p);
    context.lineTo(bw + p, 0.5 + x + p);
  }

  context.strokeStyle = "black";
  context.stroke();
}

context.fillRect(cw + p, ch + p, cw, ch);

drawBoard();
