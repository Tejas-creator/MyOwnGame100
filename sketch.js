const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
var shooter,shooterImg;
var engine, world;
var line;
var rock,rock2,rockImg,rockExp;
var bulletImg,bullet,bulletGroup;
var ufo,ufoImg,ufoGroup;
var ufo2,ufo3,ufo4;
var invisWall1,invisWall2,invisWall3,invisWall4;
var ammoSprite, ammoImg;
var happyAlien,happyAlienImg;
var rules,rulesImg;
var happyAstro,happyAstroImg;
var sadAlien,sadAlienImg;
var next,nextImg;
var flag = false;
var VICTORY = 2;
var PLAY = 1;
var gameState = PLAY;
var ammo=15;
var lol = true;
var levels = 1;
var shoot,explode;
var outOffBullet2;
var pot = false;
var sound,muteImg,unmuteImg;

function preload(){
    shooterImg = loadImage("Images/Shooter.png");
    rockImg = loadImage("Images/ROck.png");
    rockExp = loadImage("Images/explode.png");
    bulletImg = loadImage("Images/Bullet.png");
    ufoImg = loadImage("Images/UFO.png");
    ammoImg = loadImage("Images/Bullet.png");
    happyAlienImg = loadImage("Images/HappyAlien.png");
    rulesImg = loadImage("Images/Menu.png");
    happyAstroImg = loadImage("Images/happyAstro.png");
    sadAlienImg = loadImage("Images/sadAlien.png");
    nextImg = loadImage("Images/Nextlvl.png");
    shoot = loadSound("Sound/Shoot.mp3");
    explode = loadSound("Sound/Explosion.wav")
    unmuteImg = loadImage("Images/Unmute.png");
    muteImg = loadImage("Images/Mute.png");

}

function setup(){
    var canvas = createCanvas(1200,1100);
    engine = Engine.create();
    world = engine.world;



    outOffBullet2 = createButton('Try Again');
    outOffBullet2.position.x = 600;
    outOffBullet2.position.y= 510;
    outOffBullet2.hide();

    line = createSprite(620,750,1350,10);
    line.shapeColor = "white";

    invisWall1 = createSprite(5,600,10,1250);
    invisWall1.visible = false;

    invisWall2 = createSprite(600,5,1250,10);
    invisWall2.visible = false;

    invisWall3 = createSprite(1195,600,10,1250);
    invisWall3.visible = false;

    invisWall4 = createSprite(600,720,1250,10);
    invisWall4.visible = false;

    
    ammoSprite = createSprite(45,1000,20,20);
    ammoSprite.addImage("ammoSprite",ammoImg);

    shooter = createSprite(600,1000,20,50);
    shooter.addImage("shooter",shooterImg);

    

    // ufo2 = createSprite(700,420,10,10);
    // ufo2.addImage("ufo2",ufoImg);
    // ufo2.scale = 0.5;

    // ufo3 = createSprite(400,600,10,10);
    // ufo3.addImage("ufo3",ufoImg);
    // ufo3.scale = 0.5;

    // ufo4 = createSprite(200,300,10,10);
    // ufo4.addImage("ufo4",ufoImg);
    // ufo4.scale = 0.5;

    ufoGroup = new Group();
    
    // if(ufoGroup.length<1){
        
    // }

    

    rock = createSprite(600,765,10,10);
    rock.addImage("rock",rockImg);
    rock.scale = 0.5;
    rock.velocityX = rock.velocityX+(15*levels);
   
    bulletGroup = new Group();
    
        
}

function draw(){
    background("cyan");
    Engine.update(engine);
    
    sound = createSprite(1150,50,10,10);
    sound.addImage("sound",unmuteImg);
    sound.scale = 0.5
    if(mousePressedOver(sound) && pot === false){
        pot = true;
        sound.addImage("sound",muteImg);
    } else if(mousePressedOver(sound) && pot === true){
        sound.addImage("sound",muteImg);
    }
    
    

    if(gameState === PLAY){
        textSize(40)
        fill("red");
        text("Bullets Left : "+ ammo,80,1025);
    
        //Giving Movement to the player 
        if(keyDown(LEFT_ARROW)){
            shooter.x = shooter.x-10;
        }
        if(keyDown(RIGHT_ARROW)){
            shooter.x = shooter.x+10;
        }
    
    
        //Creating Bullet when player presses space bar 
        if(keyWentDown("space") && ammo >0 && lol === true){
            bullet = createBullet();
            //To minus 1 from ammo each time a bullet is shot
                ammo --;
                if(pot === false){
                    shoot.play();

                }
        }

            
        if(mousePressedOver(next)&& ufoGroup.length<1){
            levels++;
            reset();
            rock.velocityX ++;

            rock22();

            console.log("working2");
        }
        


        var numberOfUfo = 4*levels
        if(ufoGroup.length === numberOfUfo){
            flag = true;
        }
            if(flag === false){
                for(var i = 1; i <=numberOfUfo ; i++){
                    var x = Math.round(random(100,1000))
                    var y = Math.round(random(50,600))
                    ufo = createSprite(x,y,10,10);
                    ufo.addImage("ufo",ufoImg);
                    ufo.scale = 0.5;
                    ufoGroup.add(ufo);
                    ufoGroup.setVelocityXEach(10);
                    ufoGroup.setVelocityYEach(5);
                }
        }
    
    if(!ufoGroup[0]){
        next = createSprite(100,10,100,20);
        next.addImage("next",nextImg);
        next.scale = 0.5;
        

    }   
       
        
        ufoGroup.bounceOff(invisWall1);
        ufoGroup.bounceOff(invisWall2);
        ufoGroup.bounceOff(invisWall3);
        ufoGroup.bounceOff(invisWall4);

        //Setting collider radius as a circle and bouncing off rock off of invisible walls
        rock.setCollider("circle", 1, 3, 100);
        rock.bounceOff(invisWall1);
        rock.bounceOff(invisWall3);
  
    
        shooter.bounceOff(invisWall1);
        shooter.bounceOff(invisWall3);
        hitRock();
        outOffBullet();
        destroy();
    
    } else if(gameState === VICTORY){

        victory();
    }
    createEdgeSprites();
    drawSprites();
}

function createBullet(){
    
    var bullet = createSprite (10,10,20,20);
    bullet.addImage("bullet",bulletImg);
    bullet.x = shooter.x;
    bullet.y = 850;
    bullet.scale = 0.3;
    bullet.velocityY = -20;
    bulletGroup.add(bullet);
    bullet.lifetime = 100;

    
}


function destroy(){
    // if(bulletGroup.collide(ufo)){
    //     bulletGroup.destroyEach();
    //     ufo.visible = false;
    //     console.log("UFO1 has been destroyed");
    //     ufo.position.x = 2000;
    //     ufo.position.y = 2000;
    // }
    // if(ufo.visible === false){
    //     victory();
    // }

    // if(bulletGroup.collide(ufo2)){
    //     bulletGroup.destroyEach();
    //     ufo2.visible = false;
    //     console.log("UFO2 has been destroyed");
    //     ufo2.position.x = 2000;
    //     ufo2.position.y = 2000;

    // }
    // if(ufo2.visible === false){
    //     victory();
    // }

    // if(bulletGroup.collide(ufo3)){
    //     bulletGroup.destroyEach();
    //     ufo3.visible = false;
    //     console.log("UFO3 has been destroyed");
    //     ufo3.position.x = 2000;
    //     ufo3.position.y = 2000;

    // }
    // if(ufo3.visible === false){
    //     victory();
    // }

    // if(bulletGroup.collide(ufo4)){
    //     bulletGroup.destroyEach();
    //     ufo4.visible = false;
    //     console.log("UFO4 has been destroyed");
    //     ufo4.position.x = 2000;
    //     ufo4.position.y = 2000;

    // }
    // if(ufo4.visible === false){
    //     victory();

    // }

    for(var i=0;i<ufoGroup.length;i++){
        if(bulletGroup.collide(ufoGroup[i])){
            bulletGroup.destroyEach();
            ufoGroup[i].destroy();
            
        }
    }


    
}

function hitRock(){
    if(bulletGroup.isTouching(rock)){
        rock.addImage("rock",rockExp);
        rock.velocityX = 0;
        pot = true;
        if( pot === false){
            explode.play();

        }

    }

    if(rock.velocityX === 0){
        text("Oh u just shot the asteroid",200,200);
        bulletGroup.destroyEach();

    }
}


function outOffBullet(){
    
    if(ammo === 0){
        
        lol = false;
        textSize(40);
        fill("red");
        text("You are out of ammo",400,400);

        textSize(40);
        fill("red");
        text("Better Luck Next Time :)",400,450);

        
        
        shooter.visible = false;
        rock.visible = false;

        ufo.position.x = 320;
        ufo.position.y = 400;

        happyAlien = createSprite(860,400,20,20);
        happyAlien.addImage("happyAlien",happyAlienImg);

        ufoGroup.destroyEach();

        happyAlien.scale = 0.5;
        ufo.scale = 0.8;
   
    }

}

// function victory(){
//     if(flag === false && !ufoGroup[0]){
        
//         textSize(40);
//         fill("red");
//         stroke("gold");
//         text("You WON!",400,400);
    
//         textSize(40);
//         fill("red");
//         stroke("gold");
//         text("GOOD JOB ",500,450);

//         happyAstro = createSprite(300,450,10,10);
//         happyAstro.addImage("happyAstro",happyAstroImg);
//         happyAstro.scale = 0.5;

//         sadAlien = createSprite(825,450,10,10);       
//         sadAlien.addImage("sadAlien",sadAlienImg);
//         sadAlien.scale = 0.5;

//         rock.velocityX = 0;
//         rock.visible = false;

//         shooter.position.x = 600;
//         shooter.position.y = displayWidth/2+170;

//         ammoSprite.visible = false;

//         gameState = VICTORY;

//         bulletGroup.destroyEach();
        
        
//     }

// }

function reset(){
    gameState = PLAY;
    flag = false;
    ammo = 30;
    next.position.x = 2000;
    console.log("length of ufo group "+ ufoGroup.length)
}

function rock22(){
    rock2 = createSprite(600,765,10,10);
            rock2.addImage("rock2",rockImg);
            rock2.scale = 0.5;
            rock2.velocityX = rock.velocityX+(15*levels);

            rock2.setCollider("circle", 1, 3, 100);
            rock2.bounceOff(invisWall1);
            rock2.bounceOff(invisWall2);
            rock2.bounceOff(invisWall3);
            rock2.bounceOff(invisWall4);
}