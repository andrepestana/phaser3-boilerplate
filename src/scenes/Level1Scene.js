import Phaser from 'phaser'
import MyButton from './MyButton'
import WebFontFile from '../font/WebFontFile'

export default class Level1Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Level1Scene'})
    }

    preload() {
        this.load.addFile(new WebFontFile(this.load, ['Press Start 2P','Alegreya:800']))

        this.touchingLeft = false
        this.load.image('background', './assets/background.png');
        this.load.image('ground', './assets/platform.png');
        
        this.load.image('star', './assets/beer.png');//everyone has their own kind of star
        this.load.image('bomb', './assets/virus.png');
        this.load.spritesheet('character', './assets/andre.png', { frameWidth: 60, frameHeight: 100 });
        
        this.load.image('arrowLeft', './assets/arrow-left.png');
        this.load.image('arrowRight', './assets/arrow-right.png');
        this.load.image('jumpButton', './assets/button_grey.png');
    }
    create() {
        this.scale.startFullscreen()
        this.allowRestartByTouching = false
        this.gameOver = false
        this.score = 0

        console.log('this.cameras.main.y - this.cameras.main.centerY', this.cameras.main.y - this.cameras.main.centerY)
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'background');
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(this.cameras.main.centerX,  this.cameras.main.height - 20, 'ground').setScale(3).refreshBody();
        this.platforms.create(this.cameras.main.width-180, this.cameras.main.height-200, 'ground');
        this.platforms.create(this.cameras.main.width, 240, 'ground');
        this.platforms.create(100, 300, 'ground');
        this.platforms.create(this.cameras.main.width-50, this.cameras.main.height-350, 'ground');
        this.platforms.create(300, 450, 'ground');

        //Set left button
        let leftButton = new MyButton(this, 80, this.cameras.main.height-130, 'arrowLeft');
        leftButton.displayHeight = 150
        leftButton.displayWidth = 150
        leftButton.setAlpha(0.1)
        leftButton.setDepth(1);
        this.add.existing(leftButton);
        leftButton.onPressed = ()=>{
            this.touchingLeft = true;
        };
        leftButton.onReleased= ()=>{
            this.touchingLeft = false;
        };
        
        //Set right button
        let arrowRight = new MyButton(this, 260, this.cameras.main.height-130, 'arrowRight');
        arrowRight.displayWidth = 150
        arrowRight.displayHeight = 150
        arrowRight.setAlpha(0.1)
        arrowRight.setDepth(1);
        this.add.existing(arrowRight);
        arrowRight.onPressed = ()=>{
            this.touchingRight = true;
        };
        arrowRight.onReleased= ()=>{
            this.touchingRight = false;
        };

        //Set jump button
        let jumpButton = new MyButton(this, this.cameras.main.width -70, this.cameras.main.height-130, 'jumpButton');
        jumpButton.displayWidth = 150
        jumpButton.displayHeight = 150
        jumpButton.setAlpha(0.1)
        jumpButton.setDepth(1);
        this.add.existing(jumpButton);
        jumpButton.onPressed = ()=>{
            this.touchingJumpButton = true;
        };
        jumpButton.onReleased= ()=>{
            this.touchingJumpButton = false;
        };



        this.player = this.physics.add.sprite(650, 450, 'character');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('character', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'character', frame: 4 } ],
            frameRate: 20
        });
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('character', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 14 ,
            setXY: { x: 12, y: 0, stepX: 70 }
        });
    
        this.stars.children.iterate(function (child) {
    
            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            
        });
    
        this.bombs = this.physics.add.group();
    
        //  The score
        this.scoreText = this.add.text(16, 16, 'score:0', { 
            fontFamily: '"Press Start 2P"',
            fontSize: '20px'
        });
    
        //  Collide the player and the stars with the platforms
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);
    
        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
    
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
        
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard. KeyCodes.SPACE)
        this.input.on('pointerdown', function(){
            this.touchingScreen = true;
        }, this);
        this.input.on('pointerup', function(){
            this.touchingScreen = false;
        }, this);
    }
    
    update() {
        
        if(this.gameOver && (this.spaceBar.isDown || (this.touchingScreen && this.allowRestartByTouching))) {
            this.scene.start('Level1Scene')
        }

        if (this.gameOver) {
            return;
        }
        if (this.cursors.left.isDown || this.touchingLeft) {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown || this.touchingRight) {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if ((this.cursors.up.isDown || this.touchingJumpButton) && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }
    collectStar (player, star) {
        star.disableBody(true, true);

        //  Add and update the score
        this.score += 10;
        
        this.scoreText.setText('score:' + this.score);

        if (this.stars.countActive(true) === 0) {
            //  A new batch of stars to collect
            this.stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setTint(0x00ff00);
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;
            bomb.displayWidth = 40
            bomb.displayHeight = 40
        }
    }
    hitBomb (player, bomb) {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        this.gameOver = true;

        this.txt = this.make.text({
            x: this.cameras.main.centerX,
            y: this.cameras.main.centerY,
            text: 'GAME OVER',
            origin: { x: 0.5, y: 0.5 },
            style: {
                fontFamily: '"Alegreya SC"',
                fontSize: '140px',
                fill: 'red',
                wordWrap: { width: this.cameras.main.width }
            }
        })
        this.txt = this.make.text({
            x: this.cameras.main.centerX,
            y: this.cameras.main.height - 100,
            text: 'Press space bar or touch the screen to restart',
            origin: { x: 0.5, y: 0.5 },
            style: {
                fontFamily: '"Press Start 2P"',
                fontSize: '15px',
                fill: 'black',
                wordWrap: { width: this.cameras.main.width }
            }
        })
        this.time.delayedCall(2000, () => this.allowRestartByTouching = true);
    }
}