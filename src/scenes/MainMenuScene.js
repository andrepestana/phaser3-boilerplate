import Phaser from 'phaser'
import WebFontFile from '../font/WebFontFile'

export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenuScene'})
    }

    preload() {
        this.load.addFile(new WebFontFile(this.load, ['Press Start 2P','Alegreya SC:900italic']))
        this.load.image('background', './assets/background.png');
        this.load.spritesheet('character', './assets/andre.png', { frameWidth: 60, frameHeight: 100 });
    }
    
    create() { 
        
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'background');

        console.log(this.cameras.main)
        this.txt = this.make.text({
            x: this.cameras.main.centerX,
            y: 170,
            text: 'Pestana     ',
            origin: { x: 0.5, y: 0.5 },
            style: {
                fontFamily: '"Alegreya SC"',
                fontSize: '150px',
                fill: '#532382',
                wordWrap: { width: this.cameras.main.x },
                align: 'center',
                strokeThickness: 2
            }
        })
        this.txt.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
  
        this.txt = this.make.text({
            x: this.cameras.main.centerX,
            y: 280,
            text: '        World ',
            origin: { x: 0.5, y: 0.5 },
            style: {
                fontFamily: '"Alegreya SC"',
                fontSize: '150px',
                fill: '#532382',
                wordWrap: { width: this.cameras.main.x },
                align: 'center',
                strokeThickness: 2
            },
            thickness: 5
        })
        this.txt.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
 
        this.txt = this.make.text({
            x: this.cameras.main.centerX,
            y: this.cameras.main.height - 50, 
            text: 'Press space bar \nor touch the screen to start',
            origin: { x: 0.5, y: 0.5 },
            style: {
                fontFamily: '"Press Start 2P"',
		        fontSize: '30px',
                fill: 'black',
                wordWrap: { width: this.cameras.main.x },
                align: 'center'
            }
        })

        this.player = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY+130, 'character', 4);
        this.player.displayWidth = 180
        this.player.displayHeight = 300
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard. KeyCodes.SPACE)
        this.input.on('pointerdown', function(){
            this.touchingScreen = true;
        }, this);
    }

    update() {
        if(this.spaceBar.isDown || this.touchingScreen) {
            this.scene.start('Level1Scene')
        }
    }
}