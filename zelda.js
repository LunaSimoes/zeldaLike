let gameScene = new Phaser.Scene('Zelda');

var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scene: gameScene,
	physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
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
	var obstacle;
	var id_menu;
	var menu;
	var player;
	var stars;
	var monster;
	var monster2;
	var cursor;
	var keyE;
	var keyR;
	var keyM;
	var keyP;
	var keyZ;
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
	var vieMonstre2 = 3;
	var potion = 0;
	var potionTexte;
	var ruby = 0;
	var potionTexte;
	var quitterTexte;
	var ouvrirText;
	var recupbomb = 0;
	var UI;
	
	


function preload(){
	this.load.image('background','assets/fond.png');	
	this.load.image('maison','assets/maison.png');
	this.load.image('murabre','assets/murarbre.png');
	this.load.image('forest','assets/forest.png');
	this.load.image('arbre','assets/arbre.png');
	this.load.image('stars', 'assets/donnee.png');
	this.load.image('monster','assets/monster.png');
	this.load.image('menu','assets/menu.png');
	this.load.image('menu2','assets/menu2.png');
	this.load.image('bombs','assets/bombs.png');
	this.load.image('poserBombs','assets/bombs.png');
	this.load.image('obstacle', 'assets/obstacle.png');
	this.load.image('potion', 'assets/potion.png');
	this.load.image('ruby','assets/ruby.png');
	this.load.image('bouclier','assets/bouclier.png');
	this.load.spritesheet('perso','assets/perso.png',{frameWidth: 30, frameHeight: 58});
	//this.load.spritesheet('monster', 'assets/monster.png',{frameWidth: 30, frameHeight: 50});
}

function create(){
	this.add.image(400,350,'background');
	
	platforms = this.physics.add.staticGroup();
	platforms.create(300,-10,'forest');
	platforms.create(480,-10,'forest');
	platforms.create(780,-10,'forest');
	
	platforms.create(350,250,'forest');
	platforms.create(490,250,'forest');
	
	platforms.create(420,350,'maison');
	platforms.create(850,300,'murabre');
	platforms.create(10,90,'murabre');
	platforms.create(10,560,'arbre');
	
	platforms.create(150,650,'forest');
	platforms.create(300,650,'forest');
	platforms.create(480,650,'forest');
	platforms.create(780,650,'forest');
	
	platforms.create(110,950,'forest');
	platforms.create(290,950,'forest');
	platforms.create(480,950,'forest');
	platforms.create(650,950,'forest');
	
	platforms.create(0,900,'murabre');
	platforms.create(940,330,'murabre');
	platforms.create(940,330,'murabre');
	
	
	//obstacle à bouger pour accéder à la potion
	
	obstacle = this.physics.add.group({
    key: 'obstacle',
    repeat: 1,
    setXY: {
      x: 600,
      y: 500,
		stepX: 110,
		stepY: 10,
    }
  });
  
  this.physics.add.collider(obstacle,platforms);
  this.physics.add.collider(obstacle,obstacle);
  this.physics.add.collider(obstacle,monster2);
  
  obstacle.children.iterate(function (child){
		child.setBounceY(1);
	});

//Interface

		//UI
		
	UI = this.add.image(0,0,'menu');
	UI.setScrollFactor(0);
		
	vieText = this.add.text(10, 10, 'Vie = ' + vieJoueur, {fontSize: '20px', fill:'#FFF'});
	vieText.setScrollFactor(0);
	
	ouvrirText = this.add.text(150, 10, 'Inventaire [M]', {fontSize: '20px', fill:'#FFF'});
	ouvrirText.setScrollFactor(0);

	

//Player
	player = this.physics.add.sprite(420,500,'perso');
	player.setCollideWorldBounds(false);
	this.physics.add.collider(player,platforms);
	this.physics.add.collider(player,obstacle);
	this.cameras.main.startFollow(player);
	this.cameras.main.setBounds(0, 0, 1000, 1000);
	
	cursor = this.input.keyboard.createCursorKeys();
	
	//poser bombes
	keyE = this.input.keyboard.addKey('E');
	
	//utiliser potion
	keyZ = this.input.keyboard.addKey('Z');
	
	//dégainer bouclier
	
	keyR = this.input.keyboard.addKey('R');
	
	//ouvrir inventaire
	keyM = this.input.keyboard.addKey('M');
	
	//fermer inventaire
	keyP = this.input.keyboard.addKey('P');
	

	

//Monster NUMERO 1

 
	monster = this.physics.add.group({
    key: 'monster',
    repeat: 0,
    setXY: {
      x: 210,
      y: 250,
    }
  });
  	monster.setVelocityY(Phaser.Math.FloatBetween(100, 150));
	
	monster.children.iterate(function (child){
		child.setBounceY(1);
	});
	
	this.physics.add.collider(monster, platforms);
	this.physics.add.collider(monster, bouclier);
	this.physics.add.collider(monster, obstacle);
	this.physics.add.collider(monster, player, hitmonster, null, this);
	
		//toucher
	
	function hitmonster (player, monster){
		
		vieJoueur = vieJoueur - 1;
		delay = 500;
		
		if (vieJoueur == 0) {
			this.physics.pause();
			player.setTint(0xff0000);
		}
	};
	
	this.anims.create({
        key: 'monster',
        frames: this.anims.generateFrameNumbers('monster', { start: 1, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
	
	this.anims.play();
	
	
	//Monster NUMERO 2
 
	monster2 = this.physics.add.group({
    key: 'monster',
    repeat: 0,
    setXY: {
      x: 600,
      y: 400,
    }
  });
  	monster2.setVelocityY(Phaser.Math.FloatBetween(100,150));
	
	monster2.children.iterate(function (child){
		child.setBounceY(1);
	});
	
	this.physics.add.collider(monster2, platforms);
	this.physics.add.collider(monster2, obstacle);
	this.physics.add.collider(monster2, player, hitmonster2, null, this);
	
		//toucher
	
	function hitmonster2 (player, monster2){
		
		vieJoueur = vieJoueur - 1;
		delay = 500;
		
		if (vieJoueur == 0) {
			this.physics.pause();
			player.setTint(0xff0000);
		}
	};
	


	
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
	 };
	 
	 
//Potions
	
	potion = this.physics.add.group({
		key: 'potion',
		repeat:0,
		
		setXY: {x:150, y:790, stepX:70 }
	})
	 this.physics.add.collider(potion, platforms);
	 this.physics.add.overlap(player,potion,collectPotion, null, this);
	 
	 function collectPotion (player, potion){
		 potion.disableBody(true, true);
		 potion += 1;
	 };
	 
						
//Anims
	 
	 this.anims.create({
		key:'left',
		frames: this.anims.generateFrameNumbers('perso', {start: -1, end: 1}),
		frameRate: 3,
		repeat: -1
	});
	
	this.anims.create({
		key:'stop',
		frames: this.anims.generateFrameNumbers('perso', {start: 2, end: 2}),
		frameRate: 10,
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
      y: player.y,
    }
  })

	this.physics.add.collider(bouclier,monster);
	this.physics.add.overlap(player,bouclier,collectbouclier, null, this);
	 
	 function collectbouclier (player, bouclier){
		 bouclier.disableBody(true, true);
	 };
	 
	}
	
	
	//Poser Bombes
	
	if(keyE.isDown){
		boom -= 1;
		poserBombs = this.physics.add.group({
    key: 'poserBombs',
    repeat: 0,
    setXY: {
      x: player.x+50,
      y: player.y,
    }
  })
	this.physics.add.overlap(monster,poserBombs,monstrebombs, null, this);
	this.physics.add.overlap(monster2,poserBombs,monstrebombs2, null, this);
	this.physics.add.overlap(player,poserBombs,collectposerBombs, null, this);
	 
	 function collectposerBombs (player, poserBombs){
		 poserBombs.disableBody(true, true);
		 boom += 1;
	 };
	 
	 function monstrebombs (monster, poserBombs){
		 poserBombs.disableBody(true, true);
		 
		 vieMonstre = vieMonstre - 1;

	//MONSTRE 1 MEURT	
	
		if (vieMonstre == 0) {
			monster.destroy();
			detroyObstacle == detroyObstacle -1;
			ruby = this.physics.add.group({
		key: 'ruby',
		repeat: 0,
		setXY: {
		x: monster.x,
		y: monster.y,
		}
	})
		}
		
		//if (var recupbomb = 1){
		this.physics.add.overlap(player,ruby,collectruby, null, this);
		
		function collectruby (player, ruby){
		 ruby.disableBody(true, true);
		 delay: 500;
		 ruby += 1;
	 };
		}
		
	 };
	 
	 function monstrebombs2 (monster2, poserBombs){
		poserBombs.disableBody(true, true);
		 
		 vieMonstre2 = vieMonstre2 - 1;
	
		//MONSTRE 2 MEURT	
		if (vieMonstre2 == 0) {
			monster2.destroy();
			detroyObstacle == detroyObstacle -1;
			ruby = this.physics.add.group({
		key: 'ruby',
		repeat: 0,
		setXY: {
		x: monster2.x,
		y: monster2.y,
		}
	})
		}
		
		this.physics.add.overlap(player,ruby,collectruby2, null, this);
		
		function collectruby2 (player, ruby){
		 ruby.disableBody(true, true);
		 delay: 500;
		 ruby += 1;
	 };
		
	 };
	
	//Potion
	
	if(keyZ.isDown){
		potion -= 1;
		vieJoueur += 1;
	}	
	
		//Inventaire
		
	
	if (Phaser.Input.Keyboard.JustDown(keyM)){
		//Inventory

	id_menu = this.physics.add.image(300, 300, "menu2");
	id_menu.setScrollFactor(0);
	boomText = this.add.text(110, 110, 'Bombes = ' + boom, {fontSize: '20px', fill:'#FFF'});
	boomText.setScrollFactor(0);
	potionTexte = this.add.text(110, 190, 'Potion = ' + potion, {fontSize: '20px', fill:'#FFF'});
	potionTexte.setScrollFactor(0);
	rubyTexte = this.add.text(110, 280, 'Ruby = ' + ruby, {fontSize: '20px', fill:'#FFF'});
	rubyTexte.setScrollFactor(0);
	quitterTexte = this.add.text(110, 500, 'Quitter [P]', {fontSize: '20px', fill:'#FFF'});
	quitterTexte.setScrollFactor(0);
}

	 if (Phaser.Input.Keyboard.JustDown(keyP)){
		//Inventory

	id_menu.visible = false;
	boomText.destroy();
	potionTexte.destroy();
	rubyTexte.destroy();
	quitterTexte.destroy();
	
	};
	
}