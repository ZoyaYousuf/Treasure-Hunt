var PLAY=1;
var END=0;
var gameState=PLAY;
var path,boy,cash,diamonds,jwellery,sword,gameOver;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg,endImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
  path=createSprite(width/2,200);
  path.addImage(pathImg);
  path.velocityY = 4;

//creating gameover animation
  gameOver=createSprite(width/2,height-50,10,10);
  gameOver.addAnimation("gameOver",endImg);

//creating boy running
  boy = createSprite(width/2,height-20,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.08;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  background(0);
  
  if(gameState===PLAY){
    gameOver.visible=false;
        createCash();
        createDiamonds();
        createJwellery();
        createSword();
     //code to reset the background
      if(path.y > 400 ){
      path.y = height/2;
      boy.x = World.mouseX;
        
      if(boy.isTouching(swordGroup)){
        gameState=END; 
      }
  }
    
  if(gameState===END){
    boy.visible=false;
    gameOver.visible=true;
    path.velocityY=0;
    boy.addAnimation("endImg");
    swordGroup.destroyEach();
    cashG.destroyEach();
    diamondsG.destroyEach();
    jwelleryG.destroyEach();
  }
    
  edges= createEdgeSprites();
  boy.collide(edges);
  
  }
  
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+100;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+80;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
    }
      
      if(keyDown("space")){
        reset();
      }
  }

  drawSprites();
  if(gameState==END){
    textSize(15);
    fill(255);
    text("press space to restart",240,400);
  }
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,250,30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50,width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 200;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50,width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 200;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50,width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 200;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50,width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 200;
  swordGroup.add(sword);
  }
}

function reset(){
   gameState=PLAY;
 if(path.y > 400 ){
   path.y = height/2;
  }
  boy.x = World.mouseX;
  gameOver.visible=false;
  treasureCollection=0;
  boy.visible=true;
  swordGroup.destroyEach();
  jwelleryG.destroyEach();
  cashG.destroyEach();
  diamondsG.destroyEach();
}