var canvas = document.getElementById('container');
var clone = document.getElementById('ballCanvasBottom');

var cloneBall = clone.getContext('2d');
var ball = canvas.getContext('2d');

var width = $('#ballCanvasTop').width();
var height = $('#ballCanvasTop').height();

var window_width = $(window).width();
var window_height = $(window).height();

canvas.height = window_height;
canvas.width = window_width;

var ballCount = 200;  // Count 200 balls
var particles = [];

function particle() {
	this.color = 'rgba(255,255,255,' + Math.random() + ')';
	console.log(this.color);
	this.x = randomInt(0, window_width);
	this.y = randomInt(0, window_height);
	this.direction = {
		"x": -1 + Math.random() * 2,
		"y": -1 + Math.random() * 2
	};
	this.vector_x = 0.3 * Math.random();
	this.vector_y = 0.3 * Math.random();

	this.radius = randomInt(3,4);
	this.float = function(){
		this.x +=  this.vector_x * this.direction.x;
		this.y +=  this.vector_y * this.direction.y;
	};

	this.changeDirection = function(axis) {
		this.direction[axis] *= -1;
	}

	this.boundaryCheck = function() {
		if(this.x >= window_width) {
			this.x = window_width;
			this.changeDirection("x");
		} else if (this.x <= 0) {
			this.x = 0;
			this.changeDirection("x");
		} else if (this.y >= window_height) {
			this.y = window_height;
			this.changeDirection("y");
		} else if (this.y <= 0) {
			this.y = 0;
			this.changeDirection("y");
		}
	};

	this.draw = function() {
		ball.beginPath();
		ball.fillStyle = this.color;
		ball.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ball.fill();
	};
}

function clearBalls() {
	cloneBall.clearRect(0, 0, window_width, window_height);
	ball.clearRect(0,0, window_width, window_height);
}

function createParticles() {
	for (i =0; i < ballCount; i++) {
		var p = new particle();
		particles.push(p);
	}
}

function drawParticles() {
	for(i =0 ; i<particles.length; i++){
		p =particles[i];
		p.draw();
	}
}

function updateParticles() {
	for(var i = particles.length - 1; i>0 ; i--) {
		p = particles[i];
		p.float();
		p.boundaryCheck();
	}
}

createParticles();
drawParticles();

function animateParticles() {
	clearBalls();
	drawParticles();
	updateParticles();
	cloneBall.drawImage(canvas, 0, 0);
	requestAnimationFrame(animateParticles);
}
requestAnimationFrame(animateParticles);
cloneBall.drawImage(canvas,0,0);

$(window).on('resize', function(){
	window_width = $(window).width();
	window_height = $(window).height();
	canvas.width = window_width;
	canvas.height = window_height;
	clearBalls();
	particles = [];
	createParticles();
	drawParticles();
});

function randomInt(min, max) {
	return Math.floor(Math.random() * (max-min+1) + min);
}

function velocityInt(min, max) {
	return Math.random * (max-min+1)+ min;
}
