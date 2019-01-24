var colorList = ["lightsalmon",  "lightseagreen", "aqua", "lightskyblue", "aquamarine", "bisque", "lime", "limegreen", "blue", "magenta", "blueviolet", "maroon", "brown", "mediumaquamarine", "burlywood", "mediumblue", "cadetblue", "mediumorchid", "chartreuse", "mediumpurple", "chocolate", "mediumseagreen", "coral", "mediumslateblue", "cornflowerblue", "mediumspringgreen",  "mediumturquoise", "crimson", "mediumvioletred", "cyan", "midnightblue", "darkblue", "darkcyan", "darkgoldenrod", "darkgray",  "darkgreen", "navy", "darkkhaki", "darkmagenta", "olive", "darkolivegreen", "olivedrab", "darkorange", "orange", "darkorchid", "orangered", "darkred", "orchid", "darksalmon", "darkseagreen", "palegreen", "darkslateblue", "paleturquoise", "darkslategray", "palevioletred", "darkturquoise",  "darkviolet", "peachpuff", "deeppink", "peru", "deepskyblue", "pink", "dimgray", "plum", "dodgerblue", "powderblue", "firebrick", "purple", "red", "forestgreen", "rosybrown", "fuchsia", "royalblue", "saddlebrown", "salmon", "gold", "sandybrown", "goldenrod", "seagreen", "green", "sienna", "greenyellow", "silver", "skyblue", "hotpink", "slateblue", "indianred",  "indigo", "springgreen",  "steelblue", "teal", "lawngreen", "thistle", "tomato"];

class Character{
  constructor(x,y,color){
    this.x = x;
    this.y = y;
    this.color = color;
    this.y_level = 1;
  }
  drawhuman(){
    fill(this.color);
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
    if (keyIsDown(UP_ARROW)) {
      this.y_level = 2;
    } else if (keyIsDown(DOWN_ARROW)) {
       print("down");
       this.y_level = 1;
    }

    if (this.y_level == 1){
      this.y = 600;
    } else if(this.y_level == 2){
      this.y = 530;
    }

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


class Block {
  constructor(x,y, speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.direction = "down";
    this.inPlay = true;
    this.color = random(colorList);
  }
  drawBlock(){

    noStroke();
    fill(this.color);
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

class Rocket {
  constructor(y_level){
    this.x = 1050;
    if (y_level == 1){
      this.y = 600
    } else{
      this.y = 535;
    }
    // this.y = y;
    this.start_frame = cycleFrame
    this.direction = "down";
    this.inPlay = "before";
    this.color = "red";
    this.y_level = y_level;
    this.passed_next = false;
  }
  drawRocket(){
    fill(this.color);
    noStroke();
    if(this.inPlay == "before"){
      rect(970,this.y-15,8,25);
      ellipse(974, this.y+23, 11);
    } else if (this.inPlay == "yes") {
      rect(this.x, this.y, 30, 20)
      stroke(0);
      triangle(this.x, this.y, this.x, this.y+20, this.x-30, this.y+10);
    } else if (this.inPlay == "no") {
      if(this.passed_next == false){
        next_rocket_scene = round(random(10,200))+cycleFrame;
        this.passed_next = true;
      }
    }
  }

  checkRocketStatus(){
    if((cycleFrame-this.start_frame)<50){
      this.inPlay = "before";
    } else if (this.x>-10) {
      this.inPlay = "yes";
    } else{
      this.inPlay = "no";
    }
  }

  moveRocket(){
    if(this.inPlay == "yes"){
      this.x -= 20;
    }
  }


  // fallBlock(){
  //   if(frameCount%1==0){
  //     this.speed = this.speed *1.05;
  //     this.y = this.y+this.speed;
  //     if (this.y>800){
  //       this.inPlay = false;
  //     }
  //   }
  // }
  //
  //
  // //update the location of the ball, so it moves across the screen
  // moveBlock(){
  //   if (this.direction == "right"){
  //     this.x = this.x+ this.speed;
  //   } else if(this.direction == "left"){
  //     this.x = this.x - this.speed;
  //   }
  //   // this.x = this.x+ this.speed;
  //   // this.y = this.y+.5;
  // }
}


class SafeZone{
  constructor(x,y,width,y_level){
    this.x = x;
    if(y_level == 1){
      this.y = 590;
    } else if (y_level == 2) {
      this.y == 540;
    }
    this.width = width;
    this.y_level = y_level;
  }
  drawZone(){
    stroke(0);
    fill("brown");
    rect(this.x,this.y-10,30,10);
    fill(228, 251, 80, 150);
    rect(this.x,this.y,30,40);

  }
}


class BackShape{
  constructor(x,y,shape){
    this.x = x;
    this.y = y;
    this.color = random(colorList);
    this.inPlay = true;
    this.shapevar = shape;
  }

  drawShape(){
    noStroke();
    fill(this.color);
    if(this.shapevar == 1){
      rect(this.x,this.y,30,10);
    } else if(this.shapevar == 2){
      triangle(this.x, this.y, this.x+10, this.y-18.3, this.x+20, this.y);
    }
  }
}
