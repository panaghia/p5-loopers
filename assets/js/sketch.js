
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
    next +=  random(3000,7000);
    var randomWidth = random(0, windowWidth);
    var randomHeight = random(0, windowHeight);
    var randomRadius = random(30, 100);
    looperSystemArray.push(new LooperSystem(randomWidth, randomHeight, randomRadius, random(400, 900)));
    //cicleArray.push(new Circle(randomWidth, randomHeight,randomRadius*2));

  }

  for(var i = 0; i < looperSystemArray.length-1; i++) {
    looperSystemArray[i].addLooper();
    looperSystemArray[i].run();
    if(looperSystemArray[i].isDead()) {
      looperSystemArray.splice(i, 1);
      console.log('removing '+i);
      // TO DO add a fade out animation?
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


// 
var LooperSystem = function(centerX, centerY, radian, velocity) {
  this.centerX = centerX;
  this.centerY = centerY;
  this.loopers = [];
  this.radian = radian;
  this.velocity = velocity;
  this.lifeSpan = 1000.0;

};

LooperSystem.prototype.addLooper = function () {
  this.loopers.push(new Looper(this.centerX, this.centerY, this.radian, this.velocity));
};

LooperSystem.prototype.run = function () {
  for (var i = this.loopers.length-1; i>=0; i--) {
    var l = this.loopers[i];
    l.run();
    if(l.isDead()) {
      this.loopers.splice(i, 1);
    }
  }
  this.lifeSpan -= 1.0;
}

LooperSystem.prototype.isDead = function() {
  return this.lifeSpan < 0 ? true : false;
}

var Looper = function(centerX, centerY, radian, velocity) {
  this.centerX = centerX;
  this.centerY = centerY;
  this.angle = millis()/float(velocity);
  //this.angle = millis()/float(800);
  this.lifeSpan = 255.0;
  this.dead = false;
  this.radian = radian;
};

Looper.prototype.run = function () {
  this.update();
  this.display();
}

Looper.prototype.isDead = function() {
  return this.dead;
}

Looper.prototype.update = function () {
  this.lifeSpan-=1;
  if(this.lifeSpan < 0)
    this.dead = true;

  this.angle +=0.01;
}

Looper.prototype.display = function() {
  noStroke();
  fill(255,0,0, this.lifeSpan);
  var x = this.centerX + sin(this.angle )*this.radian;
  var y = this.centerY + cos(this.angle )*this.radian;
  ellipse(x, y, 5, 5);

  noSmooth();
  noFill();
};