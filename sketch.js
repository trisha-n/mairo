var mario, marioimg, obstaclesimg, certificateimg, background1, backgroundImg, ground, passGroup, 
failGroup, gameState,resetimg, score, passSound, failSound, bookimg, controllerimg, booksGroup, controllerGroup

function preload() {
  marioimg = loadImage("images/run.png");
  obstaclesimg = loadImage("images/fail.png");
  certificateimg = loadImage("images/pass.png");
  backgroundImg = loadImage("images/background2.jpg");
  resetimg = loadImage("images/reset.png");
  passSound = loadSound("images/pass.mp3");
  failSound = loadSound("images/fail.mp3");
  bookimg = loadImage("images/book.png");
  controllerimg = loadImage("images/controller.png");
}
function setup() {
  createCanvas(1000,500);
  gameState = "play";
  background1 = createSprite(500,150,1000,500);
  background1.addImage("city",backgroundImg);
  background1.scale = 2
  mario = createSprite(200,450,10,10);
  mario.addImage("mario",marioimg);
  mario.scale = 0.5;
  //mario.debug = true;
  mario.setCollider("circle",0,0,100)
  ground = createSprite(500,450,1500,10);
  ground.shapeColor = "brown";
  ground.velocityX = -5;
  passGroup = new Group();
  failGroup = new Group();
  reset = createSprite(500,200,10,10);
  reset.addImage("restart",resetimg);
  reset.visible = false;
  reset.scale = 0.5;
  score = 0;
  booksGroup = new Group();
  controllerGroup = new Group();
 }

function draw() {
 // background("white");
 if (gameState === "play"){
   reset.visible = false;
   ground.velocityX = -(5 + 3*score/20);
  
  if(ground.x < 300){
    ground.x = 500;
  }
  if(mario.y >= 200 && keyDown("SPACE")){
    mario.velocityY = -22; 
  }
 //console.log(mario.y);
 if(mario.isTouching(failGroup)){
   gameState = "end";
   failSound.play()
 }
  mario.velocityY = mario.velocityY + 0.8
  spawnObstacles();
  spwanpass();
  for(var i = 0; i < passGroup.length; i++){
  if(passGroup.get(i).isTouching(mario)){
    score = score + 1;
    passSound.play();
    passGroup.get(i).destroy();
  }
}
if(booksGroup.isTouching(mario)){
  score = score + 5;
  passSound.play();
  booksGroup.destroyEach();
}
if(controllerGroup.isTouching(mario)){
  score = score - 2;
  failSound.play();
  controllerGroup.destroyEach();
}
 }else if(gameState === "end"){
    reset.visible = true;
    failGroup.setVelocityXEach(0);
    passGroup.setVelocityXEach(0);
    booksGroup.setVelocityXEach(0);
    controllerGroup.setVelocityXEach(0);
    ground.velocityX = 0;
    failGroup.setLifetimeEach(-1);
    passGroup.setLifetimeEach(-1);
    booksGroup.setLifetimeEach(-1);
    controllerGroup.setLifetimeEach(-1);
 }
 if(mousePressedOver(reset)){
  passGroup.destroyEach();
  failGroup.destroyEach();
  booksGroup.destroyEach();
  controllerGroup.destroyEach();
  score = 0;
  gameState = "play";
 }
 mario.collide(ground);
  drawSprites();
  fill("black");
  textSize(12)
  text("POINTS:  " +score, 800,100);
 }
 function spawnObstacles(){
   var ran = Math.round(random(60,200))
   if(frameCount % ran === 0){
    var obstacle = createSprite(1000,400,10,10);
    obstacle.addImage("fail",obstaclesimg);
    obstacle.velocityX = -(5 + 3*score/20);
    obstacle.scale = 0.1
    failGroup.add(obstacle);
    obstacle.lifetime = 200;
  }
  if(frameCount % 400 === 0){
    var controller = createSprite(1000,300,10,10);
    controller.y = Math.round(random(200,300))
    controller.addImage("PS4",controllerimg);
    controller.velocityX = -(5 + 3*score/20);
    controller.scale = 0.5;
    controllerGroup.add(controller);
    controller.lifetime = 200;
  }
}
 function spwanpass(){
   var ran = Math.round(random(100,200))
   if (frameCount % ran === 0){
     var certificate = createSprite(1000,300,10,10);
     certificate.addImage("pass",certificateimg);
     certificate.y = Math.round(random(200,300))
     certificate.velocityX = -(5 + 3*score/20);
     certificate.scale = 0.1;
     passGroup.add(certificate);
     certificate.lifetime = 200;
  }
  if(frameCount % 300 === 0){
    var books = createSprite(1000,300,10,10);
    books.addImage("book",bookimg);
    books.velocityX = -(5 + 3*score/20);
    books.scale = 0.1;
    booksGroup.add(books);
    books.lifetime = 200;
 }
 }