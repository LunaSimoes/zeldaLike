let gameScene = new Phaser.Scene('Zelda');

var config = {
	type: Phaser.AUTO,
	width: 1024 ,
	height: 728,
	scene: gameScene,
	physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
	scene: {
		init: init,
		preload: preload,
		create: create,
		update: update
	}
};

var game = new Phaser.Game(config);


function init(){
	var platforms;
	var player;
	var stars;
	var monster;
	var cursor;
	var touch;
	var bombs;
	var gameOver = false;
	this.boom = 0;
	this.donnee = 3;
	var boomText;
	var donneeText;

}
function preload(){
	this.load.image('background','assets/fondzelda.png');	
	this.load.image('sol','assets/montagne.png');
	this.load.image('sol2','assets/forest.png');
	this.load.image('sol3','assets/solzelda.png');
	this.load.image('stars', 'assets/donnee.png');
	this.load.image('monster','assets/monster.png');
	this.load.image('mur','assets/murzelda.png');
	this.load.image('menu','assets/menu.png');
	this.load.image('bombs','assets/bombs.png');
	this.load.image('finished', 'assets/finished.png');
	this.load.spritesheet('perso','assets/robot.png',{frameWidth: 31.5, frameHeight: 40});
}
function create(){
	this.add.image(400,50,'background');
	
	platforms = this.physics.add.staticGroup();
	platforms.create(250,50,'sol').setScale(1).refreshBody();
	platforms.create(-80,150,'sol')
	platforms.create(-150,300,'sol')
	platforms.create(550,700,'sol3');
	platforms.create(-150,650,'sol');
	platforms.create(500,400,'sol2');
	platforms.create(1200,50,'sol3');
	platforms.create(1000,500,'mur');
	

//Player
	player = this.physics.add.sprite(250,160,'perso');
	player.setCollideWorldBounds(true);
	this.physics.add.collider(player,platforms);
	
	cursor = this.input.keyboard.createCursorKeys();
	//touch = this.input.keyboard.addKey('E');

//Monster
 
	monster = this.physics.add.group({
    key: 'monster',
    repeat: 1,
    setXY: {
      x: 250,
      y: 250,
      stepX: 500,
      stepY: 200
    }
  });
  	monster.setVelocityY(Phaser.Math.FloatBetween(100, 150));
	
	monster.children.iterate(function (child){
		child.setBounceY(1);
	});
	
	this.physics.add.collider(monster, platforms);
	this.physics.add.collider(monster, [player], hitmonster, null, this);
	
		//toucher
	
	function hitmonster (player, monster){
		
		this.physics.pause();
		player.setTint(0xff0000);
	};
	
	
//Inventory

menu = this.physics.add.staticGroup();
menu.create(510,50,'menu');
boomText = this.add.text(16, 50, 'Bombes = 0', {fontSize: '20px', fill:'#FFF'});
donneeText = this.add.text(16, 16, 'Donnees = 3', {fontSize: '20px', fill:'#FFF'});

	
//Bombs
	
	bombs = this.physics.add.group({
		key: 'bombs',
		repeat:0,
		setXY: {x:900, y:300, stepX:70 }
	})
	 this.physics.add.collider(bombs, platforms);
	 this.physics.add.overlap(player,bombs,collectBombs, null, this);
	 
	 function collectBombs (player, bombs){
		 bombs.disableBody(true, true);
		 this.boom += 1;
		 boomText.setText('Bombes: ' + this.boom);
	 };
	
//STARS
	
	stars = this.physics.add.group({
		key: 'stars',
		repeat:0,
		setXY: {x:900, y:600, stepX:70 }
	})
	 this.physics.add.collider(stars, platforms);
	 this.physics.add.overlap(player,stars,collectStar, null, this);
	 
	 function collectStar (player, star){
		 star.disableBody(true, true);
		 this.donnee += 1;
		 donneeText.setText('Donnees: ' + this.donnee);
		 
		finished = this.physics.add.staticGroup();
		finished.create(500,300,'finished')
	 };
	 
	 
	 this.anims.create({
		key:'left',
		frames: this.anims.generateFrameNumbers('perso', {start: 0, end: 3}),
		frameRate: 10,
		repeat: -1
	});
	
	this.anims.create({
		key:'stop',
		frames: this.anims.generateFrameNumbers('perso', {start: 4, end: 4}),
		frameRate: 20,
		repeat: -1
	});
	

}


function update(){
	
	player.body.velocity.x = 0;
	
		if(cursor.left.isDown){
		player.anims.play('left',true);
		player.setVelocityX(-190);
		player.setFlipX(false);
	}
	
	else if(cursor.right.isDown) {
		player.anims.play('left',true);
		player.setVelocityX(190);
		player.setFlipX(true);	
	}
	
	else {
		player.anims.play('stop',true);
		player.setVelocityX(0);
		player.setVelocityY(0);
	}

	if(cursor.up.isDown){
		player.setVelocityY(-200);
	}
	
	if(cursor.down.isDown){
		player.setVelocityY(200);
	}
	
	//if(touch.E.isDown){
		//menu.disableBody(true, true);
	//}

}

