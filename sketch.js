 var gameState = "play"
 var tower,towerImg
 var door,doorImg,doorGroup
 var climber,climberImg,climeberGroup
 var ghost,ghostImg
 var invisibleBlock,invisibleBlockGroup
 var spookySound
 
 function preload(){
   
   towerImg = loadImage("tower.png")                   
   doorImg = loadImage("door.png")
   climberImg = loadImage("climber.png")
   ghostImg = loadImage("ghost-standing.png","ghost-jumping.png")

   spookySound = loadSound("spooky.wav")
 }

 function setup(){
 createCanvas(600,600)
 spookySound.loop()
   
 climberGroup = new Group()
 doorGroup = new Group()
 invisibleBlockGroup = new Group()
   
 tower = createSprite(300,300)
 tower.addImage("tower",towerImg)
 tower.velocityY = 4
   
 ghost = createSprite(200,200,50,50)
 ghost.addImage(ghostImg)
 ghost.scale = 0.4  
   
 }

 function draw(){
   
   background(0)
   
   if(gameState === "play"){
     
   
   if (tower.y> 400){
     tower.y = 300
   }
   
   if(keyDown("space")){
     ghost.velocityY = -5
   }
   
   ghost.velocityY = ghost.velocityY + 0.8
   
   if(climberGroup.isTouching(ghost)){
     ghost.velocityY = 0
   }
   
   if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
     ghost.destroy()
     gameState = "end"
   }
   
   if(keyDown("left_Arrow")){
     ghost.x = ghost.x - 3
   }
   
   if (keyDown("right_Arrow")){
     ghost.x = ghost.x + 3
   }
   
   spawnDoors()
     
   drawSprites()
     
   }
   if (gameState === "end"){
     text = ("Game Over",230,250)
     stroke("yellow")
     fill("yellow")
     textSize(30)
   }
 }

 function spawnDoors(){
   
  if(frameCount%100 === 0){
    
    door = createSprite(200,100)  
    climber = createSprite(200,180)
    invisibleBlock = createSprite(200,50)
    
    invisibleBlock.width = climber.width
    invisibleBlock.height = 2
    
    door.addImage(doorImg)
    climber.addImage(climberImg)
    invisibleBlock.visible = false
    
    door.x = Math.round(random(120,400))
    climber.x = door.x
    invisibleBlock.x = door.x
    
    door.velocityY = 4
    climber.velocityY = 4
    invisibleBlock.velocityY = 4
    
    ghost.depth = door.depth
    ghost.depth = ghost.depth + 1
    
    door.lifetime = 400
    climber.lifetime = 400
    invisibleBlock.lifetime = 400
    
    doorGroup.add(door)
    climberGroup.add(climber)
    invisibleBlockGroup.add(invisibleBlock)
    
  }
   
 }