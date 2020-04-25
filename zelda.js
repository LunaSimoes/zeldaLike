let gameScene = new Phaser.Scene('Zelda');

var config = {
	type: Phaser.AUTO,
	width: 800 ,
	height: 600,
	scene: gameScene,
	physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};

var game = new Phaser.Game(config);

	var platforms;
	var player;
	var stars;
	var monster;
	var cursor;
	var keyE;
	var keyR
	var touch;
	var bouclier;
	var bombs;
	var poserBombs;
	var potion;
	var gameOver = false;
	var boom = 0;
	var boomText;
	var vieJoueur = 3;
	var vieText;
	var vieMonstre = 3;
	var monstreText;
	var potion = 0;
	var potionTexte;
	
	


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
	this.load.image('poserBombs','assets/bombs.png');
	this.load.image('finished', 'assets/finished.png');
	this.load.image('potion', 'assets/potion.jpg');
	this.load.spritesheet('perso','assets/robot.png',{frameWidth: 31.5, frameHeight: 40});
}
function create(){
	this.add.image(400,50,'background');
	
	platforms = this.physics.add.staticGroup();
	platforms.create(250,50,'sol').setScale(1).refreshBody();
	platforms.create(-80,150,'sol')
	platforms.create(-150,300,'sol')
	platforms.create(550,600,'sol3');
	platforms.create(-150,650,'sol');
	platforms.create(400,350,'sol2');
	platforms.create(1200,50,'sol3');
	platforms.create(800,500,'mur');
	

//Player
	player = this.physics.add.sprite(250,160,'perso');
	player.setCollideWorldBounds(true);
	this.physics.add.collider(player,platforms);
	
	cursor = this.input.keyboard.createCursorKeys();
	keyE = this.input.keyboard.addKey('E');
	keyZ = this.input.keyboard.addKey('Z');
	keyR = this.input.keyboard.addKey('R');

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
	this.physics.add.collider(monster, player, hitmonster, null, this);
	
		//toucher
	
	function hitmonster (player, monster){
		
		vieJoueur = vieJoueur - 1;
		
		vieText.setText('Vie = ' + vieJoueur);
		
		
		if (vieJoueur == 0) {
			this.physics.pause();
			player.setTint(0xff0000);
		}
	};
	
	
//Inventory

menu = this.physics.add.staticGroup();
menu.create(510,50,'menu');
boomText = this.add.text(16, 16, 'Bombes = 0', {fontSize: '20px', fill:'#FFF'});
vieText = this.add.text(16, 50, 'Vie = 3', {fontSize: '20px', fill:'#FFF'});
monstreText = this.add.text(150, 50, 'VieMonstre = 3', {fontSize: '20px', fill:'#FFF'});
potionTexte = this.add.text(350, 50, 'Potion = 0', {fontSize: '20px', fill:'#FFF'});


	
//Bombs
	
	bombs = this.physics.add.group({
		key: 'bombs',
		repeat:0,
		setXY: {x:500, y:150, stepX:70 }
	})
	 this.physics.add.collider(bombs, platforms);
	 this.physics.add.overlap(player,bombs,collectBombs, null, this);
	 
	 function collectBombs (player, bombs){
		 bombs.disableBody(true, true);
		 boom += 1;
		 boomText.setText('Bombes = ' + boom);
	 };
	 
	 
//Potions
	
	potion = this.physics.add.group({
		key: 'potion',
		repeat:0,
		
		setXY: {x:300, y:550, stepX:70 }
	})
	 this.physics.add.collider(potion, platforms);
	 this.physics.add.overlap(player,potion,collectPotion, null, this);
	 
	 function collectPotion (player, potion){
		 potion.disableBody(true, true);
		 potion += 1;
		 potionTexte.setText('Potion = ' + potion);
	 };
	 
						
//Anims
	 
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
	
	//Bouclier 
		if(keyR.isDown){
		bouclier = this.physics.add.staticGroup({
    key: 'bouclier',
    repeat: 0,
    setXY: {
      x: player.x,
      y: player.y + 10,
    }
  })
	this.physics.add.overlap(monster,bouclier,protection, null, this);
	this.physics.add.overlap(player,bouclier,collectbouclier, null, this);
	 
	 function collectbouclier (player, bouclier){
		 bouclier.disableBody(true, true);
	 };
	 
	 function protection (monster, bouclier){
		 bouclier.disableBody(true, true);
	 };
	}
	
	
	//Poser Bombes
	if(keyE.isDown){
		boom -= 1;
		boomText.setText('Bombes = ' + boom);
		poserBombs = this.physics.add.group({
    key: 'poserBombs',
    repeat: 0,
    setXY: {
      x: player.x,
      y: player.y,
    }
  })
	this.physics.add.overlap(monster,poserBombs,monstrebombs, null, this);
	this.physics.add.overlap(player,poserBombs,collectposerBombs, null, this);
	 
	 function collectposerBombs (player, poserBombs){
		 poserBombs.disableBody(true, true);
		 delay: 500,
		 boom += 1;
		 boomText.setText('Bombes = ' + boom);
	 };
	 
	 function monstrebombs (monster, poserBombs){
		 poserBombs.disableBody(true, true);
		 
		 vieMonstre = vieMonstre - 1;
		
		monstreText.setText('vieMonstre = ' + vieMonstre);
		
		if (vieMonstre == 0) {
			monster.destroy();
		}
		
	 };
	}
	
	if(keyZ.isDown){
		potion -= 1;
		potionTexte.setText('Potion = ' + potion);
		vieJoueur += 1;
		vieText.setText('Vie = ' + vieJoueur);
	}
	
}