//------------------------------------var declarations-------
var main_block = 0;
var main_block_array = [];
var shooter_array = [];
var og_human = 0;
var alive = true;
var level = 1;
var safeZones = [];
var x_scene = 0;
var x_increase = 0;
var backShapes = [];


function setup() {
  createCanvas(1000, 800);
  background(255);

// ------make origonal character////////////////////////////////////////
  og_human = new Character(50,600,0);

// ---make origonal blocks to start with////////////////////////////////////////////////
  add_blocks(15);
  safeZones[0] = new SafeZone(300,590,30)
}

function draw() {
  x_change = true;
  if(og_human.x>950){
    x_increase = 3;
  } else if (og_human.x>700) {
    x_increase = 1;
  } else if (og_human.x>500) {
    x_increase = 0.5;
  } else{
    x_increase = 0.25;
  }
  x_scene += x_increase;

  safeZones[0].x -=x_increase;
  og_human.x -=x_increase;

  for(let j = 0; j < main_block_array.length; j++) {
    if(main_block_array[j].inPlay == true){
      if (x_change == true){
        main_block_array[j].x -= x_increase;
      }
    }
  }

  background(255);
  // stroke(3);
  text("Level " + level, 500, 200);

  safeZones[0].drawZone();

  //white background rectangle with text ////////////////////////////////////////////////////////
  noStroke();
  fill(255);
  rect(0, 0, 75, 20);
  //text showing mouse coordinates
  fill(255, 0, 0);
  text("("+mouseX + ", " + mouseY+")", 5, 15);

  fill("green");
  rect(0,633,1000,300);




// -------main blok creation and falls (based on level)///////////////////////////////////////////////////////////////////////////////////
  if(alive == true){
    if(frameCount%15==0){
      add_blocks(2);
    }
    if(level == 1){
      checkColitions();
      cyclebocks();

    } else if (level == 2) { ////////////////////////////////////////////////////////////LEVEL 2 below//////////////////////////////////////////////
      if(frameCount%10==0){
        add_blocks(2);
      }

      checkColitions();
      cyclebocks();

    } else {
      print("please reload");
    } /////////////////////////////////////////////////////if dead:
  } else{
    text("you are dead :(", 450, 300);
    text("press space to try again", 430, 315);
  }


// ----- move human---//////////////////////////////////////////////draw and then move the human
  og_human.movehuman();
  og_human.drawhuman();
  og_human.testHumanLevel();

// ---- safe zones--///////////////////////////////////////////////////////////////
  safeZones[0].drawZone();


/////////////////////////shooting component//////////////////////////////////
  // if (mouseIsPressed) {
  //   shooter_array.push(new Shooter);
  //   print(shooter_array[shooter_array.length-1].slope)
  // }
  //
  // for(let j = 0; j < shooter_array.length; j++) {
  //   shooter_array[j].drawshooter();
  //   shooter_array[j].moveShooter();
  //   print(shooter_array[j].slope)
  // }
}



function checkColitions() {
  for(let j = 0; j < main_block_array.length; j++) {
    if(main_block_array[j].y > 600 && main_block_array[j].y<630){
      if(main_block_array[j].x > (og_human.x - 40) && main_block_array[j].x < (og_human.x + 10)){
        if(og_human.x>300&&og_human.x<320){
          print("close call");
        } else{
          alive = false;
          print("dead");
        }
      }
    }
  }
}

function cyclebocks(){
  for(let j = 0; j < main_block_array.length; j++) {
    if(main_block_array[j].inPlay == true){
      main_block_array[j].drawBlock();
      main_block_array[j].fallBlock();
    }
  }
}

function add_blocks(num_new){
  for(let i = 0;i<=num_new;i++){
    main_block_array.push(new Block(random(0,1000),20,random(0,2)))
  }
}

//--------------------------------------------------------define classes-------------------
// -------the character item
class Character{
  constructor(x,y,color){
    this.x = x;
    this.y = y;
    this.color = color;
  }
  drawhuman(){
    rect(this.x,this.y,10,30);
  }
  movehuman(){
    if (keyIsDown(LEFT_ARROW)||(keyIsDown(65))) {
     this.x = this.x-4;
     // print("left");
   } else if (keyIsDown(RIGHT_ARROW)||keyIsDown(68)) {
     // print("right");
     this.x = this.x+4;
   }
   // if (keyIsDown(UP_ARROW)) {
   //   this.y = this.y-2.5;
   //   print("down");
   // } else if (keyIsDown(DOWN_ARROW)) {
   //   print("up");
   //   this.y = this.y+2.5;
   // }

  }
  testHumanLevel(){
    // print("run");
    if(this.x>1000 && alive==true){
      print("level2");
      level = 2;
      og_human.x = 50;
      main_block_array = [];
      // ---make origonal blocks
        for(let i = 0;i<=15;i++){
          main_block_array[i] = new Block(random(0,1000),20,random(0,2))
        }
    }
  }
}


class SafeZone{
  constructor(x,y,width){
    this.x = x;
    this.y = y;
    this.width = width;
  }
  drawZone(){
    fill("brown");
    rect(this.x,580,30,10);
    fill(228, 251, 80, 150);
    rect(this.x,590,30,40);

  }
}

class BackShape{
  constructor(x,y,width,color){
    this.x = x;
    this.y = y;
    this.width = width;

  }
  drawZone(){
    noStroke();
    fill(color);
    rect(this.x,thix.y,30,10);
    fill(228, 251, 80, 150);
    rect(this.x,590,30,40);

  }
}

function newBackShape(){
  backShapes.push(new BackShape(1010, random(100,700),random(10,75), "yellow"));
}

// ----- the falling items
class Block {
  constructor(x,y, speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.direction = "down";
    this.inPlay = true;
  }
  drawBlock(){
    stroke(100);
    fill(100);
    rect(this.x,this.y,30,10);
    // console.log("hasrun2");
  }

  fallBlock(){
    if(frameCount%1==0){
      this.speed = this.speed *1.05;
      this.y = this.y+this.speed;
      if (this.y>800){
        this.inPlay = false;
      }
    }
  }


  //update the location of the ball, so it moves across the screen
  moveBlock(){
    if (this.direction == "right"){
      this.x = this.x+ this.speed;
    } else if(this.direction == "left"){
      this.x = this.x - this.speed;
    }
    // this.x = this.x+ this.speed;
    // this.y = this.y+.5;
  }
}

function keyPressed(){ //every time you push a key, make a new ball from the ball class and add it to the balls array
  if (keyCode === 32) {
    if (alive==false){
      alive = true;
      og_human.x = 50;
      main_block_array = [];
      // ---make origonal blocks
        for(let i = 0;i<=15;i++){
          main_block_array[i] = new Block(random(0,1000),20,random(0,2))
        }
      }
    } else{
      // run = false;
  }
}

class Shooter{
  constructor(){
    this.x = og_human.x;
    this.y = og_human.y;
    this.slope = (mouseY - og_human.y)/(mouseX - og_human.x);
    // this.speed = 3;
  }
  drawshooter(){
    ellipse(this.x,this.y,10);
  }
  moveShooter(){
//
//
// pow(move_y, 2) + pow(move_x, 2) = 25
// move_y/move_x=this.slope
//
//
//
//
    this.y -= 3
    this.x += (-3/this.slope);
  }

}
//
// function Ship() {
//   this.pos = createVector(width / 2, height / 2);
//   this.r = 20;
//   this.heading = 0;
//   this.rotation = 0;
//   this.vel = createVector(0, 0);
//   this.isBoosting = false;
//
//   this.boosting = function(b) {
//     this.isBoosting = b;
//   }
//
//   this.update = function() {
//     if (this.isBoosting) {
//       this.boost();
//     }
//     this.pos.add(this.vel);
//     this.vel.mult(0.99);
//   }
//
//   this.boost = function() {
//     var force = p5.Vector.fromAngle(this.heading);
//     force.mult(0.1);
//     this.vel.add(force);
//   }
//
//   // this.hits = function(asteroid) {
//   //   var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
//   //   if (d < this.r + asteroid.r) {
//   //     return true;
//   //   } else {
//   //     return false;
//   //   }
//   // }
//
//   this.render = function() {
//     push();
//     translate(this.pos.x, this.pos.y);
//     rotate(this.heading + PI / 2);
//     fill(0);
//     stroke(255);
//     triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
//     pop();
//   }
//
//   this.edges = function() {
//     if (this.pos.x > width + this.r) {
//       this.pos.x = -this.r;
//     } else if (this.pos.x < -this.r) {
//       this.pos.x = width + this.r;
//     }
//     if (this.pos.y > height + this.r) {
//       this.pos.y = -this.r;
//     } else if (this.pos.y < -this.r) {
//       this.pos.y = height + this.r;
//     }
//   }
//
//   this.setRotation = function(a) {
//     this.rotation = a;
//   }
//
//   this.turn = function() {
//     this.heading += this.rotation;
//   }
// }
