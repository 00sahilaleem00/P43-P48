const Engine = Matter.Engine;
const World= Matter.World;
const Body = Matter.Body;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var gameState, levelState;
var playerBody, playerVertical, playerImage, checkpointx, checkpointy;
var enemy1, enemy1direction;
var enemy2, enemy2direction;
var wall;
var platform1Body;

function setup(){
  rectMode(CENTER);
  imageMode(CENTER);
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;

  gameState = "START MENU";
  levelState = 0;
  checkpointx = 0;
  checkpointy = 0;
  platform1Body = new Platform(100,100,30,50);
  
  playerBody = new Box(checkpointx,checkpointy,50,100);

  enemy1 = new Enemy(windowWidth-80,windowHeight-25,40,40);
  enemy1direction = 1;
  enemy2direction = 1;

  wall = new Wall;
}

function draw(){
  background(100,100,100);
  Engine.update(engine);

    if(gameState==="START MENU"){
        /*var title, inputbutton, inputbar, inputValue;
        inputValue = null;
        title = createElement('h2');
        title.html("WELCOME TO THE GAME");
        title.position(displayWidth/2, displayHeight/4);

        inputbar = createInput("Enter Your Name");
        inputbar.position(displayWidth/2, displayHeight/2);

        inputbutton = createButton('ENTER');
        inputbutton.position(displayWidth/2,displayHeight/2-50);

        inputbutton.mousePressed(()=>{
            inputbar.hide();
            title.hide();
            inputbutton.hide();
            inputValue = inputbar.value();
            console.log(inputValue);
        });*/
        
        //if(inputValue !== null){
            gameState = "PLAY";
            levelState = 1;
            checkpointx = windowWidth-100;
            checkpointy = windowHeight-100;
            Body.setPosition(playerBody.body,{x:checkpointx, y:checkpointy});
        //}
    }

    if(gameState==="PLAY"){
        if(levelState===1){
            //console.log("levelState = "+levelState);
            
            platform1Body.display();
            playerBody.display();
            enemy1.display();

            var direct1 = enemyMotion(windowWidth-100,windowWidth-50,enemy1);
            if(direct1!==undefined){
                enemy1direction = direct1;
            }
            Body.setPosition(enemy1.body,{x:enemy1.body.position.x+enemy1direction,y:enemy1.body.position.y});
            enemyCollision(playerBody,enemy1);
            //console.log(wall.bodybottom);
            //bodyCollision(playerBody.body,platform1Body.body);
        }

        /*if(levelState===2){
            //console.log("levelState = "+levelState);
            platform2.display();
            playerBody.display();
            enemy2.display();
                
            enemyMotion(windowWidth-100,windowWidth-50,enemy2,enemy2direction);
            Body.setPosition(enemy2.body,{x:enemy2.body.position.x+enemy2direction,y:enemy2.body.position.y});
            enemyCollision(playerBody,enemy2);
        }*/
    }

  if(playerBody.body.velocity.y>-0.1){
      playerVertical = "down";
  }
  else if(playerBody.body.velocity.y<0.1){
      playerVertical = "up";
  }

  //console.log(playerBody.body);

  fill("red");
  //Moving left
  if(touches.length === 2&&playerVertical=="down"){
      Body.setVelocity(playerBody.body, {x:-10, y:0});
      Body.applyForce(playerBody.body, playerBody.body.position, {x:0, y:-100});
      touches = [];
    }
  //Moving right
  if(touches.length === 1&&playerVertical=="down"){
      Body.setVelocity(playerBody.body, {x:10, y:0});
      Body.applyForce(playerBody.body, playerBody.body.position, {x:0, y:-100});
      touches = [];
    }

  if(touches.length = 0){
    Body.setVelocity(playerBody.body, {x:0, y:0});
  }

  textSize(15);
  text("PRESS ONE FINGER TO JUMP RIGHT",10,40)
  text("AND TWO TO JUMP LEFT", 10, 60)


}

function keyPressed(){
    //Moving left
    if(keyCode===97||keyCode===65||keyCode===27/*||touches.length === 2*/){
        Body.setVelocity(playerBody.body, {x:-10, y:0});
        Body.applyForce(playerBody.body, playerBody.body.position, {x:0, y:-100});
        touches = [];
    }
    //Moving right
    if(keyCode===100||keyCode===68||keyCode===26/*||touches.length === 1*/){
        Body.setVelocity(playerBody.body, {x:10, y:0});
        Body.applyForce(playerBody.body, playerBody.body.position, {x:0, y:-100});
        console.log(windowWidth);
        touches = [];
    }

    //N to change level
    /*if(keyCode===78||keyCode===110){
        World.remove(world,enemy1.body);
        World.remove(world,platform1Body.body);
        levelState = 2;
        platform2 = new Platform(700,500,300,50);
        enemy2 = new Enemy(300,height-25,40,40);
        checkpointx = 500;
        checkpointy = 50;
        Body.setPosition(playerBody.body,{x:checkpointx, y:checkpointy});
    }*/
}

function keyReleased(){
    //Left or Right release
    if(keyCode===97||keyCode===65||keyCode===27||keyCode===100||keyCode===68||keyCode===26){
        Body.setVelocity(playerBody.body, {x:0, y:0});
    }
}

function enemyMotion(xMin, xMax, enemy){
    if(enemy.body.position.x<=xMin){
        return 1;
    }
    if(enemy.body.position.x>=xMax){
        return -1;
    }
}

function enemyCollision(playerBody, enemy){
    if((playerBody.body.position.x-enemy.body.position.x<=(40+50)/2&&enemy.body.position.x-playerBody.body.position.x<=(40+50)/2)&&
       (playerBody.body.position.y-enemy.body.position.y<=(40+100)/2&&enemy.body.position.y-playerBody.body.position.y<=(40+100)/2)){
        Body.setPosition(playerBody.body,{x:checkpointx,y:checkpointy});
        Body.setVelocity(playerBody.body,{x:0,y:0});
        Body.setVelocity(enemy.body,{x:0,y:0});
        console.log("collision");
    }
}

/*function bodyCollision(body1,body2){
    body1Width = (body1.vertices[1].x - body1.vertices[0].x);
    body1Height = (body1.vertices[2].y - body1.vertices[1].y);
    body2Width = (body2.vertices[1].x - body2.vertices[0].x);
    body2Height = (body2.vertices[2].y - body2.vertices[1].y);

    if (body1.position.x - body2.position.x < body2Width/2 + body1Width/2&&
        body2.position.x - body1.position.x < body2Width/2 + body1Width/2&&
        body1.position.y - body2.position.y < body2Height/2 + body1Height/2&&
        body2.position.y - body1.position.y < body2Height/2 + body1Height/2) {
        //body1.velocity.x = body1.velocity.x * (-1);
        Body.setVelocity(body1,{x:body1.velocity.x*(-1),y:body1.velocity.y*(-1)});
        Body.setVelocity(body2,{x:body2.velocity.x*(-1),y:body2.velocity.y*(-1)});
        //body2.velocity.x = body2.velocity.x * (-1);
        //body1.velocity.y = body1.velocity.y * (-1);
        //body2.velocity.y = body2.velocity.y * (-1);
        //Body.setPosition(body1,{x:})
    }
}*/
