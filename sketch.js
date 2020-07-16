//Global Variables
var PLAY = 1;
var END = 0;
var gamestate = PLAY;

var monkey, monkey_running ;
var invisibleground ;
var jungle, jungleimg;
var obstacleimg;
var bananaimg;
var gameover,restart;
var bananagroup;
var stonegroup;
var score;



function preload(){

monkey_running = 
loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png","Monkey_10.png");
  
jungleimg = loadImage("jungle.jpg");
  
obstacleimg = loadImage("stone.png");
  
bananaimg = loadImage("Banana.png");

}


function setup() {
  createCanvas(800,400);
  
  jungle = createSprite(0,0,800,400);
  jungle.addImage("jgl",jungleimg);
  jungle.scale = 1.4;
  jungle.velocityX = -4;
  jungle.width = 800;
  jungle.x = jungle.width /2;
  
  invisibleground = createSprite(300,250,800,10);
  invisibleground.visible = false;
  
  monkey = createSprite(50,200,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.10;
  
  bananagroup = new Group();
  stonegroup = new Group();
  
  score = 0;
  
}


function draw(){
 
  background("white"); 
  

 if(gamestate === PLAY){
  
  
  if (jungle.x < 200){
    jungle.x = jungle.width/2;
  }
 
   if(bananagroup.isTouching(monkey)){
     
     bananagroup.destroyEach();
     score = score + 2;
      }
    switch(score){
    
      case 10: monkey.scale = 0.12;
               break;
      case 20: monkey.scale = 0.14;
               break;
      case 30: monkey.scale = 0.16;
               break;
      case 40: monkey.scale =  0.18;
               break;
    }
  
  if(keyDown("space") && monkey.y >= 169){
    monkey.velocityY = -14 ;
  }
    monkey.velocityY = monkey.velocityY + 0.8;
  
  if(stonegroup.isTouching(monkey)){
    monkey.scale = 0.1;
    gamestate = END;
     }
  
               
  spawnbananas();
  spawnstones();
}

else if(gamestate === END){
    
    invisibleground.velocityX = 0;
    monkey.velocityY = 0;
    stonegroup.setVelocityXEach(0);
    bananagroup.setVelocityXEach(0);
    jungle.velocityX = 0;
    
    stonegroup.setLifetimeEach(-1);
    bananagroup.setLifetimeEach(-1);         
     } 
  
  monkey.collide(invisibleground);
  
drawSprites();

fill(255);
text("Score: "+ score, 500,50);
}


function spawnbananas (){
  
   if (frameCount % 80 === 0) {
    var banana = createSprite(600,320,40,10);
    banana.y = Math.round(random(70,200));
    banana.addImage(bananaimg);
    banana.scale = 0.05;
    banana.velocityX = -7;
    banana.lifetime = 134;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    bananagroup.add(banana);
  }
}

function spawnstones () {
  if(frameCount % 100 === 0) {
    var stone = createSprite(600,220,10,40);
    stone.velocityX = -8
    stone.addImage(obstacleimg);
    stone.scale = 0.13;
    stone.lifetime = 200;
    
    stonegroup.add(stone);
}
}

   
    
    
  
    
    
 




