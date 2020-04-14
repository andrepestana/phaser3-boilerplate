import Phaser from 'phaser'

export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenuScene'})
    }

    preload() {
        this.load.image('background', './assets/background.png');
        this.load.spritesheet('character', './assets/andre.png', { frameWidth: 60, frameHeight: 100 });
    }
    
    create() {
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'background');

        console.log(this.cameras.main)
        this.txt = this.make.text({
            x: this.cameras.main.centerX,
            y: 100,
            text: 'Pestana World',
            origin: { x: 0.5, y: 0.5 },
            style: {
                font: 'bold 40px Arial',
                fill: 'purple',
                wordWrap: { width: 300 }
            }
        })

        this.txt = this.make.text({
            x: this.cameras.main.centerX,
            y: this.cameras.main.height - 100,
            text: 'Press space bar \nor touch the screen to start',
            origin: { x: 0.5, y: 0.5 },
            style: {
                font: 'bold 20px Arial',
                fill: 'black',
                wordWrap: { width: 800 },
                align: 'center'
            }
        })

        this.player = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'character', 4);

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