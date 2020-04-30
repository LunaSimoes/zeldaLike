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
	var keyY;
	var touch;
	
	var bouclier;
	var bombs;
	var poserBombs;
	var potion;
	
	var gameOver = false;
	var utiliserBouclier = false;
	
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
	var annonceTexte;
	var quitterTexte;
	var ouvrirText;
	var recupbomb = 0;
	var UI;
	
	var coffre;
	var coffre2;
	
	//essaie item obtenus
	var nombreObtenu = 0;
	var itemObtenu = 'Rien';
	
	


function preload(){
	this.load.image('background','assets/fond.png');	
	this.load.image('maison','assets/maison.png');
	this.load.image('murabre','assets/murarbre.png');
	this.load.image('forest','assets/forest.png');
	this.load.image('rangearbre','assets/rangearbre.png');
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
	this.load.image('coffre','assets/coffre.png');
	this.load.image('bouclier','assets/bouclier.png');
	this.load.spritesheet('perso','assets/perso.png',{frameWidth: 30, frameHeight: 58});
	//this.load.spritesheet('monster', 'assets/monster.png',{frameWidth: 30, frameHeight: 50});
}

function create(){
	this.add.image(1000,1000,'background');
	
	platforms = this.physics.add.staticGroup();
	
	platforms.create(1000,10,'rangearbre');
	
	platforms.create(350,270,'forest');
	platforms.create(490,270,'forest');
	
	platforms.create(440,370,'forest'); //empeche le joueur de marcher sur une partie de la maison
	platforms.create(400,370,'forest'); //empeche le joueur de marcher sur une partie de la maison
	
	this.add.image(420,350,'maison');
	//platforms.create(420,350,'maison');
	platforms.create(850,300,'murabre');
	
	platforms.create(300,670,'forest');
	platforms.create(150,680,'forest');
	platforms.create(480,650,'forest');
	platforms.create(780,650,'forest');
	
	platforms.create(110,960,'forest');
	platforms.create(500,900,'forest');
	platforms.create(400,950,'forest');
	platforms.create(250,980,'forest');
	
	platforms.create(10,330,'murabre');
	platforms.create(10,950,'murabre');
	platforms.create(10,350,'murabre');
	platforms.create(10,990,'murabre');
	platforms.create(10,1640,'murabre');
	platforms.create(150,90,'arbre');
	
	platforms.create(310,1360,'forest');
	platforms.create(700,1300,'forest');
	platforms.create(600,1350,'forest');
	platforms.create(450,1380,'forest');
	platforms.create(310,1460,'forest');
	platforms.create(700,1400,'forest');
	platforms.create(600,1450,'forest');
	platforms.create(450,1480,'forest');
	

	platforms.create(310,1960,'forest');
	platforms.create(700,1900,'forest');
	platforms.create(600,1950,'forest');
	platforms.create(450,1980,'forest');
	platforms.create(310,1960,'forest');
	platforms.create(600,1950,'forest');
	platforms.create(450,1980,'forest');
	
	platforms.create(670,1550,'forest');
	platforms.create(750,1610,'forest');
	platforms.create(750,1720,'forest');
	platforms.create(750,1800,'forest');
	
	platforms.create(700,1900,'forest');

	platforms.create(2390,350,'rangearbre');
	platforms.create(1430,1150,'forest');
	platforms.create(1250,1150,'forest');
	
	platforms.create(1350,1400,'forest');
	platforms.create(1430,1450,'forest');
	platforms.create(2400,1500,'rangearbre');
	
	platforms.create(1150,1500,'arbre');
	platforms.create(1100,1550,'arbre');
	
	platforms.create(940,330,'murabre');
	platforms.create(960,950,'murabre');
	platforms.create(2000,350,'murabre');
	platforms.create(2000,990,'murabre');
	platforms.create(2000,1650,'murabre');
	
	platforms.create(1370,450,'forest');
	platforms.create(1330,550,'forest');
	platforms.create(1300,650,'forest');
	platforms.create(1330,750,'forest');
	platforms.create(1480,850,'forest');
	
	platforms.create(990,2000,'rangearbre');

	
	
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

	

//Player
	player = this.physics.add.sprite(420,500,'perso');
	player.setCollideWorldBounds(false);
	this.physics.add.collider(player,platforms);
	this.physics.add.collider(player,obstacle);
	this.cameras.main.startFollow(player);
	this.cameras.main.setBounds(0, 0, 2000, 2000);
	
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
	
	//fermer boite de dialogue
	keyY = this.input.keyboard.addKey('Y');
	

	

//Monster NUMERO 1

 
	monster = this.physics.add.group({
    key: 'monster',
    repeat: 1,
    setXY: {
      x: 210,
      y: 250,
		stepX: 900,
		stepY: 50,
    }
  });
  	monster.setVelocityY(Phaser.Math.FloatBetween(100, 150));
	
	monster.children.iterate(function (child){
		child.setBounceY(1);
		child.setBounceX(1);
	});
	
	this.physics.add.collider(monster, platforms);
	this.physics.add.collider(monster, bouclier);
	this.physics.add.collider(monster, obstacle);
	this.physics.add.collider(monster, player, hitmonster, null, this);
	
		//toucher
	
	function hitmonster (player, monster){
		
		vieJoueur = vieJoueur - 1;
		vieText.destroy();
		vieText = this.add.text(10, 10, 'Vie = ' + vieJoueur, {fontSize: '20px', fill:'#FFF'});
		vieText.setScrollFactor(0);
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
    repeat: 1,
    setXY: {
      x: 700,
      y: 800,
		stepX: 500,
		stepY: 500,
    }
  });
  	monster2.setVelocityX(Phaser.Math.FloatBetween(100,150));
	
	monster2.children.iterate(function (child){
		child.setBounceX(1);
		child.setBounceY(1);
	});
	
	this.physics.add.collider(monster2, platforms);
	this.physics.add.collider(monster2, obstacle);
	this.physics.add.collider(monster2, bouclier);
	this.physics.add.collider(monster2, player, hitmonster2, null, this);
	
		//toucher
	
	function hitmonster2 (player, monster2){
		
		vieJoueur = vieJoueur - 1;
		vieText.destroy();
		
		vieText = this.add.text(10, 10, 'Vie = ' + vieJoueur, {fontSize: '20px', fill:'#FFF'});
		vieText.setScrollFactor(0);
		delay = 500;
		
		if (vieJoueur == 0) {
			this.physics.pause();
			player.setTint(0xff0000);
		}
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
		var nombreObtenu = 1;
		var itemObtenu = 'Potion'
		 potion.disableBody(true, true);
		 potion += 1;
		annonceTexte.destroy();
		annonceTexte = this.add.text(10, 60, 'Vous obtenez 1 potion.', {fontSize: '16px', fill:'#FFF'});
		annonceTexte.setScrollFactor(0);
	 };
	 
//coffre

coffre = this.physics.add.image(100,150,'coffre');
this.physics.add.overlap(player,coffre,collectCoffre, null, this);

 function collectCoffre (player, coffre){
	annonceTexte.destroy();
	annonceTexte = this.add.text(10, 60, 'Vous obtenez 3 pieges. Appuyer sur E.', {fontSize: '16px', fill:'#FFF'});
	annonceTexte.setScrollFactor(0);
		 coffre.disableBody(true, true);
		 boom += 3;
	 };
	 

//coffre 2  DEBLOQUER BOUCLIER

coffre2 = this.physics.add.image(675,150,'coffre');
this.physics.add.overlap(player,coffre2,collectCoffreEncore, null, this);

 function collectCoffreEncore (player, coffre2){
	annonceTexte.destroy();
	annonceTexte = this.add.text(10, 60, 'Vous obtenez un bouclier. Appuyer sur R.', {fontSize: '16px', fill:'#FFF'});
	annonceTexte.setScrollFactor(0);
		 coffre2.disableBody(true, true);
		 utiliserBouclier = true;
		 
	 };
	 
	 
//coffre 3  encore plus de pieges !

coffre3 = this.physics.add.image(1700,1800,'coffre');
this.physics.add.overlap(player,coffre3,collectCoffreEncore2, null, this);

 function collectCoffreEncore2 (player, coffre3){
	annonceTexte.destroy();
	annonceTexte = this.add.text(10, 60, 'Vous obtenez 5 pieges.', {fontSize: '16px', fill:'#FFF'});
	annonceTexte.setScrollFactor(0);
		 coffre3.disableBody(true, true);
		 boom += 5;
		 
	 };
	 
	 
//Ruby 

rubyPerdu = this.physics.add.group({
		key: 'ruby',
		repeat: 0,
		setXY: {
		x: 1100,
		y: 150,
		}
	})
	
		this.physics.add.overlap(player,rubyPerdu,collectrubyPerdu, null, this);
		
		function collectrubyPerdu (player, rubyPerdu){
		 rubyPerdu.disableBody(true, true);
		 delay: 500;
		 ruby += 1;
		annonceTexte.destroy();
		annonceTexte = this.add.text(10, 60, 'Vous obtenez 1 ruby.', {fontSize: '16px', fill:'#FFF'});
		annonceTexte.setScrollFactor(0);
	 };
	 
	 
//Piege A l'abandon 

PiegeAbandonne = this.physics.add.group({
		key: 'bombs',
		repeat: 0,
		setXY: {
		x: 500,
		y: 1800,
		}
	})
	
		this.physics.add.overlap(player,PiegeAbandonne,collectPiegeAbandonne, null, this);
		
		function collectPiegeAbandonne (player, PiegeAbandonne){
		 PiegeAbandonne.disableBody(true, true);
		 delay: 500;
		 boom += 1;
		annonceTexte.destroy();
		annonceTexte = this.add.text(10, 60, 'Vous obtenez 1 piege.', {fontSize: '16px', fill:'#FFF'});
		annonceTexte.setScrollFactor(0);
	 };
	 
	 
//Piege A l'abandon 

PiegeAbandonne2 = this.physics.add.group({
		key: 'bombs',
		repeat: 2,
		setXY: {
		x: 1800,
		y: 480,
			stepX: -490,
			stepY: 400,
		}
	})
	
		this.physics.add.overlap(player,PiegeAbandonne2,collectPiegeAbandonne2, null, this);
		
		function collectPiegeAbandonne2 (player, PiegeAbandonne2){
		 PiegeAbandonne2.disableBody(true, true);
		 delay: 500;
		 boom += 1;
		annonceTexte.destroy();
		annonceTexte = this.add.text(10, 60, 'Vous obtenez 1 piege.', {fontSize: '16px', fill:'#FFF'});
		annonceTexte.setScrollFactor(0);
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
	
	
	//Interface

		//UI
		
	UI = this.add.image(0,20,'menu');
	UI.setScrollFactor(0);
		
	vieText = this.add.text(10, 10, 'Vie = ' + vieJoueur, {fontSize: '20px', fill:'#FFF'});
	vieText.setScrollFactor(0);
	
	ouvrirText = this.add.text(150, 10, 'Inventaire [M]', {fontSize: '20px', fill:'#FFF'});
	ouvrirText.setScrollFactor(0);
	
	fond = this.physics.add.image(-40,70,'menu');
	fond.setScrollFactor(0);
	
	annonceTexte = this.add.text(10, 60, ' ', {fontSize: '20px', fill:'#FFF'});
	annonceTexte.setScrollFactor(0);

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
	
	if (utiliserBouclier == true){
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
}
	
	
	//Poser Bombes
	
	if(boom >=1){
	
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
		annonceTexte.destroy();
		annonceTexte = this.add.text(10, 60, 'Vous obtenez 1 ruby.', {fontSize: '16px', fill:'#FFF'});
		annonceTexte.setScrollFactor(0);
	 };
		}
		
	}};
	 
	 function monstrebombs2 (monster2, poserBombs){
		poserBombs.disableBody(true, true);
		 
		 vieMonstre2 = vieMonstre2 - 1;
	
		//MONSTRE 2 MEURT	
		if (vieMonstre2 == 0) {
			monster2.destroy();
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
		annonceTexte.destroy();
		annonceTexte = this.add.text(10, 60, 'Vous obtenez 1 ruby.', {fontSize: '16px', fill:'#FFF'});
		annonceTexte.setScrollFactor(0);
	 };
		
	 };
	
	//Potion
	
	if(keyZ.isDown){
		potion -= 1;
		vieJoueur += 1;
	}	
	
	//Passer Text
	
	if(keyY.isDown){
		coffreTexte.destroy();
	}	
	
		//Inventaire
		
	
	if (Phaser.Input.Keyboard.JustDown(keyM)){
		//Inventory

	id_menu = this.physics.add.image(290, 300, "menu2");
	id_menu.setScrollFactor(0);
	
	boomText = this.add.text(170, 110, 'Pieges = ' + boom, {fontSize: '20px', fill:'#FFF'});
	boomText.setScrollFactor(0);
	iconePiege = this.add.image(130,120,'bombs');
	UI.setScrollFactor(0);
	
	potionTexte = this.add.text(170, 190, 'Potion = ' + potion, {fontSize: '20px', fill:'#FFF'});
	potionTexte.setScrollFactor(0);
	iconePotion = this.add.image(130,190,'potion');
	UI.setScrollFactor(0);
	
	rubyTexte = this.add.text(170, 280, 'Ruby = ' + ruby, {fontSize: '20px', fill:'#FFF'});
	rubyTexte.setScrollFactor(0);
	iconeRuby = this.add.image(130,280,'ruby');
	UI.setScrollFactor(0);
	
	quitterTexte = this.add.text(320, 400, 'Quitter [P]', {fontSize: '20px', fill:'#FFF'});
	quitterTexte.setScrollFactor(0);
}

	 if (Phaser.Input.Keyboard.JustDown(keyP)){
		//Inventory

	id_menu.visible = false;
	
	boomText.destroy();
	iconePiege.destroy();
	
	potionTexte.destroy();
	iconePotion.destroy();
	
	rubyTexte.destroy();
	iconeRuby.destroy();
	
	quitterTexte.destroy();
	
	
	};
	
}