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
var x_background = 0
var backShapes = [];
var levelDistance = 0;
var rockets = [];
var cycleFrame = 0
var ran2 = [1,2];
var next_rocket_scene = 1;



function setup() {
  createCanvas(1000, 780);
  background(255);

  // rockets[0] = new Rocket(2);

  backShapes.push(new BackShape(500,300,2));


  newBackShape(20, 0);
  // print(backShapes);

// ------make origonal character////////////////////////////////////////
  og_human = new Character(50,600,0);

// ---make origonal blocks to start with////////////////////////////////////////////////
  add_blocks(15);
  safeZones[0] = new SafeZone(300,590,30,1);
  safeZones[1] = new SafeZone(950, 590, 30, 2);
}

function draw() {

  if(cycleFrame==next_rocket_scene){
    rockets.push(new Rocket(random(ran2)));
  }

  cycleFrame ++

  x_background+=x_increase;
  if(alive == true){
    for(j=0;j<rockets.length;j++){
      rockets[j].drawRocket();
    }
  }

  // print(x_scene);
  if(og_human.x<-10){
    alive = false;
  }

  if(alive == true){
    x_change = true;
    if(og_human.x>950){
      x_increase = 4;
    } else if (og_human.x>700) {
      x_increase = 2.5;
    } else if (og_human.x>400) {
      x_increase = 1.5;
    } else{
      x_increase = 0.5;
    }

  } else{
    x_increase = 0;
  }

  x_scene += x_increase;

  for(let j=0; j < safeZones.length; j++){
    safeZones[j].x -=x_increase;
  }
  for(let j=0; j < backShapes.length; j++){
    backShapes[j].x -=x_increase;
  }


  og_human.x -=x_increase;

  for(let j = 0; j < main_block_array.length; j++) {
    if(main_block_array[j].inPlay == true){
      if (x_change == true){
        main_block_array[j].x -= x_increase;
      }
    }
  }



  draw_scene();






// -------main blok creation and falls (based on level)///////////////////////////////////////////////////////////////////////////////////
  if(alive == true){
    if(frameCount%13==0){
      add_blocks(2);
    }
    if(frameCount%100==0){
      newBackShape(1, 700);
    }
    if(level == 1){
      checkColitions();
      cyclebocks();

    } else if (level == 2) { ////////////////////////////////////////////////////////////LEVEL 2 below//////////////////////////////////////////////
      if(frameCount%9==0){
        add_blocks(2);
      }
      checkColitions();
      cyclebocks();

    } else {
      print("please reload");
    } /////////////////////////////////////////////////////if dead:
  } else{
    fill(0);
    noStroke();
    text("you are dead :(", 450, 300);
    text("press space to try again", 430, 315);
  }


// ----- move human---//////////////////////////////////////////////draw and then move the human
  og_human.movehuman();
  og_human.drawhuman();
  og_human.testHumanLevel();

// ---- safe zones--///////////////////////////////////////////////////////////////
  for(j=0;j<safeZones.length;j++){
    safeZones[j].drawZone();
  }
  safeZones[1].drawZone();

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

  for(j=0;j<rockets.length;j++){
    rockets[j].checkRocketStatus();
    rockets[j].moveRocket();
    rockets[j].drawRocket();
  }

} //////////////////end of draw













