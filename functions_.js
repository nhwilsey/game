backShapeList = [1,1,2];
var checkY_level = 600;
var safe = false;

function newBackShape(numRun, startxv){
  for(h=0; h<numRun; h++){
    backShapes.push(new BackShape(random(startxv,1000),random(50,450),random(backShapeList)));
  }
}

function draw_scene(){
  background(121, 169, 247);
  // stroke(3);
  fill(0);
  stroke(1);
  text("Score: " + round((x_background)/10), 500, 30);


  //white background rectangle with text ////////////////////////////////////////////////////////
  noStroke();
  fill(255);
  rect(0, 0, 75, 20);
  //text showing mouse coordinates
  fill(255, 0, 0);
  text("("+mouseX + ", " + mouseY+")", 5, 15);

  fill("green");
  rect(0,633,1000,300);
  for(let j=0; j < safeZones.length; j++){
    safeZones[j].drawZone();
  }

  for(let j=0; j < backShapes.length; j++){
    backShapes[j].drawShape();
  }
}

function checkColitions() {
  if (og_human.y_level==1){
    checkY_level = 600;
  } else if (og_human.y_level==2) {
    checkY_level = 530;
  }

  safe = false;

  for(let i = 0; i < safeZones.length; i++){
    if(og_human.x > safeZones[i].x && og_human.x < (safeZones[i].x + 20)&&og_human.y_level==safeZones[i].y_level){
      safe = true;
    }
  }

  for(let j = 0; j < main_block_array.length; j++) {
    if(main_block_array[j].y > checkY_level && main_block_array[j].y<(checkY_level+30)){
      if(main_block_array[j].x > (og_human.x - 40) && main_block_array[j].x < (og_human.x + 10)){
        if(safe == true){
          // if(og_human.y_level==safeZones[i].y_level){
            print("close call");
        } else{
            alive = false;
            print("dead");
        }
      }
    }
  }
  for (let j = 0; j<rockets.length; j++) {
    if (rockets[j].y_level == og_human.y_level){
      // print(rockets[j].x);
      // print("og_human:"+ og_human.x);
      if ((rockets[j].x-30)<og_human.x&&(rockets[j].x+20)>og_human.x){
        if(safe==true){
          print("close call")
        } else{
        print("dead");
        alive = false;
        this.inPlay = "exploded";
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
    main_block_array.push(new Block(random(0,1200),20,random(0,2)))
  }
}

function keyPressed(){ //every time you push a key, make a new ball from the ball class and add it to the balls array
  if (keyCode === 32) {
    if (alive==false){
      restart();
    }
  }
}

function restart(){
  alive = true;
  og_human.x = 50;
  main_block_array = [];
  // ---make origonal blocks
  for(let i = 0;i<=15;i++){
    main_block_array[i] = new Block(random(0,1000),20,random(0,2))
  }
  for(let j = 0; j<safeZones.length; j++){
    safeZones[j].x = 300;
  }
  backShapes = [];
  newBackShape(10,0);
  og_human.y_level = 1;
  cycleFrame = 0;
  rockets[0].x = 1050;
}
