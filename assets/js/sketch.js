var looperSystemArray = [];
var cicleArray = [];

var next = 0;

function setup() {
  var c = createCanvas(windowWidth, windowHeight);
  //looperSystem = new LooperSystem(windowWidth/2, windowHeight/2, 200, 800);
}

function draw() {
  background(0);

  
  if(millis() > next) {
    next +=  random(7000,12000);
    var randomWidth = random(0, windowWidth);
    var randomHeight = random(0, windowHeight);
    var randomRadius = random(30, 100);
    looperSystemArray.push(new LooperSystem(randomWidth, randomHeight, randomRadius, random(400, 900)));
    //cicleArray.push(new Circle(randomWidth, randomHeight,randomRadius*2));

  }

  for(var i = 0; i < looperSystemArray.length-1; i++) {
    var looperSystem = looperSystemArray[i];
    looperSystem.addLooper();
    looperSystem.run();
    if(looperSystem.isDead()) {
      looperSystemArray.splice(i, 1);
    }
  }

  /*
  for(var i = 0; i < cicleArray.length-1; i++) {
    cicleArray[i].display();
  }*/
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

 
var LooperSystem = function(centerX, centerY, radian, velocity) {
  this.centerX = centerX;
  this.centerY = centerY;
  this.loopers = [];
  this.radian = radian;
  this.velocity = velocity;
  this.lifeSpan = 1000.0;
  this.childLifeSpan = 155.0;
};

LooperSystem.prototype.addLooper = function () {
  if(this.lifeSpan > 0)
    this.loopers.push(new Looper(this.centerX, this.centerY, this.radian, this.velocity, this.childLifeSpan));
};

LooperSystem.prototype.isDead = function () {
  return this.lifeSpan < -this.childLifeSpan ? true : false;
}

LooperSystem.prototype.run = function () {

  for (var i = this.loopers.length-1; i>=0; i--) {
    var l = this.loopers[i];
    l.run();
  }
  this.lifeSpan -= 1.0;
}

var Looper = function(centerX, centerY, radian, velocity, lifeSpan) {
  this.centerX = centerX;
  this.centerY = centerY;
  this.angle = millis()/float(velocity);
  this.lifeSpan = lifeSpan;
  this.dead = false;
  this.radian = radian;
};

Looper.prototype.run = function () {
  this.update();
  this.display();
}

Looper.prototype.isDead = function() {
  return this.lifeSpan < 0 ? true : false;
}

Looper.prototype.update = function () {
  this.lifeSpan-=1;
  this.angle +=0.01;
}

Looper.prototype.display = function() {
  noStroke();
  fill(255,0,0, this.lifeSpan);
  var x = this.centerX + sin(this.angle )*this.radian;
  var y = this.centerY + cos(this.angle )*this.radian;
  ellipse(x, y, 3, 3);

  noSmooth();
  noFill();
};