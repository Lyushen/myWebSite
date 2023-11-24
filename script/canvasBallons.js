document.addEventListener('DOMContentLoaded', (event) => {

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

// Define balloons
var balloons = [
  { x: 150, y: 200, radius: 20, color: 'red' },
  { x: 150, y: 200, radius: 20, color: 'green' },
  { x: 150, y: 200, radius: 20, color: 'blue' },
  { x: 150, y: 200, radius: 20, color: 'yellow' },
  { x: 150, y: 200, radius: 20, color: 'purple' }
];

// Function to draw a balloon
function drawBalloon(balloon) {
  ctx.beginPath();
  ctx.arc(balloon.x, balloon.y, balloon.radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = balloon.color;
  ctx.fill();
  ctx.closePath();
}

// Animation function
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
  
  // Update balloon positions and draw
  balloons.forEach(function(balloon) {
    balloon.y -= 1; // Move balloon up
    drawBalloon(balloon);
  });

  // Loop the animation
  requestAnimationFrame(animate);
}

// Start the animation
animate();
});
