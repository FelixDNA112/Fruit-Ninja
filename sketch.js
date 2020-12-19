//Game States
var PLAY = 1;
var END = 0;
var gameState = "PLAY";

var alienGroup, alien1, alien2
var fruitGroup, fruit1, fruit2, fruit3, fruit4;

var gameover, gameoverImage;

var sword, swordImage;

var score;

var knifeSwooshSound, gameoverSound




function preload(){
  
gameoverImage = loadImage("gameover.png");
  
swordImage = loadImage("sword.png");
  
alienMonster = loadAnimation("alien1.png","alien2.png");
fruit1 = loadImage("fruit1.png");
fruit2 = loadImage("fruit2.png");
fruit3 = loadImage("fruit3.png");
fruit4 = loadImage("fruit4.png");
  
knifeSwooshSound = loadSound("knifeSwooshSound.mp3")
gameoverSound = loadSound("gameover.mp3")

 
}

function setup(){
  createCanvas(400,400);
  score=0;
  //creating swords
sword = createSprite(40,200,20,20);
sword.addImage(swordImage);
sword.scale = 0.7;
  
fruitGroup = new Group();
alienGroup = new Group();
  

}

function draw(){
background (0);
if (gameState === "PLAY") {

sword.y = World.mouseY;
sword.x = World.mouseX

  
//spawnFruits
spawnFruits();
  
//spawnAliens
spawnAliens();

if (sword.isTouching(fruitGroup)) {
  fruitGroup.destroyEach();
  knifeSwooshSound.play();
  score = score + 1;
}
  
if (sword.isTouching(alienGroup)) {
  alienGroup.destroyEach();
  fruitGroup.destroyEach();
  sword.addImage(gameoverImage);
  sword.x = 200;
  sword.y = 200;
  gameoverSound.play();
  gameState = "END"
}
  
}

drawSprites();
  text("Score: "+ score, 200,50);
}

//creating the spawn fruits function
function spawnFruits(){
 if (frameCount % 60 === 0){
   var fruit = createSprite(400,200,10,10);
   fruit.y = Math.round(random(10,350));
   var p = Math.round(random(1,2));
   if (p == 1) {
     fruit.x = 0;
     fruit.velocityX = (4+score/100);
   }
   else {
     fruit.x = 400;
     fruit.velocityX = -(4+score/100);
   }
    //generate random fruits
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: fruit.addImage(fruit1);
              break;
      case 2: fruit.addImage(fruit2);
              break;
      case 3: fruit.addImage(fruit3);
              break;
      case 4: fruit.addImage(fruit4);
              break;
      default: break;
    }
    //assign scale and lifetime to the fruit       
    fruit.scale = 0.25;
    fruit.lifetime = 300;
   
   //add each obstacle to the group
    fruitGroup.add(fruit);
 }
}

//creating the spawn aliens function
function spawnAliens(){
 if (frameCount % 60 === 0){
   var alien = createSprite(400,200,10,10);
   alien.y = Math.round(random(10,350))
   alien.addAnimation("something",alienMonster);
   alien.velocityX = -(10+score/100);
    
   
    //assign scale and lifetime to the alien
    alien.scale = 0.75;
    alien.lifetime = 300;
   
   //add each obstacle to the group
    alienGroup.add(alien);
 }
 }

