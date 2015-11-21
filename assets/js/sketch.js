
function setup() {
	var c = createCanvas(windowWidth, windowHeight);

}

function draw() {
	background(0);
	var circle = new Circle(windowWidth/2, windowHeight/2, 50);
	circle.display();

	var loop = new Looper(windowWidth/2, windowHeight/2, 1000, 25);
	loop.display();
}

var Circle = function(x, y, diameter) {
	this.posx = x;
	this.posy = y;
	this.diameter = diameter;
};

Circle.prototype.display = function() {
	noFill();
	stroke(150);
	smooth();
	ellipse(this.posx, this.posy, this.diameter, this.diameter);
	noSmooth();
};

var Looper = function(centerX, centerY, orbitDuration, orbitRad) {
	this.centerX = centerX;
	this.centerY = centerY;
	this.orbitDuration = orbitDuration;
	this.orbitRad = orbitRad;
};

Looper.prototype.display = function() {
	fill(250);
	var ang = TWO_PI * millis()/this.orbitDuration;
	var x = cos(ang)*this.orbitRad;
	var y = sin(ang)*this.orbitRad;
	smooth();
	ellipse(x+this.centerX, y+this.centerY, 5, 5);
	noSmooth();
	noFill();
};