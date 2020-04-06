var config = {
	type: Phaser.AUTO,
	width: 1024 ,
	height: 728,
	physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
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
	var fantome;
}
function preload(){
	this.load.image('background','assets/fondpong.png');	
	this.load.image('sol','assets/solpacman.png');
	this.load.image('sol2','assets/solpac2.png');
	this.load.image('sol3','assets/solpac3.png');
	this.load.image('sol4','assets/solpac4.png');
	this.load.image('stars', 'assets/donnee.png');
	this.load.image('fantome','assets/fantome.png');
	this.load.spritesheet('perso','assets/robott.png',{frameWidth: 31, frameHeight: 47});
}
function create(){
	this.add.image(400,50,'background');
	
	platforms = this.physics.add.staticGroup();
	platforms.create(60,750,'sol').setScale(1).refreshBody();
	platforms.create(470,750,'sol');
	platforms.create(850,750,'sol');
	platforms.create(60,-10,'sol');
	platforms.create(470,-10,'sol');
	platforms.create(850,-10,'sol');
	platforms.create(500,600,'sol2');
	platforms.create(500,200,'sol2');
	platforms.create(500,550,'sol3');
	platforms.create(500,150,'sol3');
	platforms.create(-100,500,'sol2');
	platforms.create(-100,200,'sol2');
	platforms.create(1100,500,'sol2');
	platforms.create(1100,200,'sol2');
	platforms.create(300,420,'sol4');
	platforms.create(700,420,'sol4');


	fantome = this.physics.add.group();
	fantome.create(200, 300, 'fantome');
	fantome.create(800, 300, 'fantome');
	 this.physics.add.collider(fantome, platforms);

	 
	fantome.children.iterate(function (child){
		child.setBounceY(Phaser.Math.FloatBetween(1, 1.3));
	});
	
	player = this.physics.add.sprite(500,670,'perso');
	player.setCollideWorldBounds(true);
	this.physics.add.collider(player,platforms);
	
	cursor = this.input.keyboard.createCursorKeys();
	
	stars = this.physics.add.group({
		key: 'stars',
		repeat:0,
		setXY: {x:500, y:400, stepX:70 }
	})
	 this.physics.add.collider(stars, platforms);
	 this.physics.add.overlap(player,stars,collectStar, null, this);
	 
	 function collectStar (player, star){
		 star.disableBody(true, true);
	 }

	
	
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
		fantome.setVelocityY(-150);
	}
	
	else if(cursor.right.isDown) {
		player.anims.play('left',true);
		player.setVelocityX(190);
		player.setFlipX(true);
		fantome.setVelocityY(150);		
	}
	
	else {
		player.anims.play('stop',true);
		player.setVelocityX(0);
	}

	if(cursor.up.isDown){
		player.setVelocityY(-200);
	}
	
	if(cursor.down.isDown){
		player.setVelocityY(200);
	}
}
