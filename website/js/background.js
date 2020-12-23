var ctx;
var width, height;

var starfield;

const bgColor = '#654caf';

function init() {
  const canvas = document.getElementById('canvas');
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  ctx = canvas.getContext('2d');

  starfield = new Starfield(2500, 1, 100);
  starfield.speed = starfield.maxSpeed;

  var links = document.getElementsByClassName('link');
  for(let link of links) {

    link.addEventListener('mouseenter', function() {
      starfield.hyperspace = true;
    });

    link.addEventListener('mouseleave', function() {
      starfield.hyperspace = false;
    })

  }

  ctx.translate(width / 2, height / 2);

  var background = function(color) {
    ctx.fillStyle = color;
    ctx.fillRect(-width, -height, width * 2, height * 2);
  }

  var frame = function() {
    background(bgColor);
    starfield.update();
    requestAnimationFrame(frame);
  }
  frame();
}

function Starfield(starNumber, minSpeed, maxSpeed) {
  this.stars = [];
  this.starNumber = starNumber;
  this.accelerationDelay = 1000;
  this.minSpeed = minSpeed * this.accelerationDelay;
  this.maxSpeed = maxSpeed * this.accelerationDelay;
  this.speed = this.minSpeed;
  this.hyperspace = false;

  for(let i = 0; i < this.starNumber; i++) {
    this.stars.push(new Star());
  }
}

Starfield.prototype.update = function() {
  for(let star of this.stars) {

    let pz = star.z;

    star.z -= this.speed / this.accelerationDelay;

    if(this.hyperspace && this.speed < this.maxSpeed) {
      this.speed++;
    }
    else if(!this.hyperspace && this.speed > this.minSpeed) {
      this.speed--;
    }

    if(star.z < 1) {
      star.relocate();
    }

    let fx = star.x / star.z * width;
    let fy = star.y / star.z * height;
    let r = star.maxRadius - star.z / width * star.maxRadius;
    let alpha = 1 - star.z / width;

    let px = star.x / pz * width;
    let py = star.y / pz * height;

    ctx.beginPath();
    ctx.fillStyle = 'rgba(255, 255, 255,' + alpha + ')';
    ctx.arc(fx, fy, r * 2, 0, Math.PI * 2, false);
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 255, 255,' + alpha + ')';;
    ctx.lineWidth = r * 2;
    ctx.lineCap = 'round';
    ctx.moveTo(fx, fy);
    ctx.lineTo(px, py);
    ctx.stroke();
  }
}

function Star() {
  this.x = Math.floor((Math.random() * width * 2) - width);
  this.y = Math.floor((Math.random() * height * 2) - height);
  this.z = Math.floor(Math.random() * width);
  this.maxRadius = 1;
}

Star.prototype.relocate = function() {
  this.x = Math.floor((Math.random() * width * 2) - width);
  this.y = Math.floor((Math.random() * height * 2) - height);
  this.z = width;
}

window.addEventListener('click', function(e) {
 var star = new Star();
 star.x = e.clientX * star.z / width;
 star.y = e.clientY * star.z / height;
 starfield.stars.push(star);
});

init();