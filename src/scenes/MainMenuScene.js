import Phaser from 'phaser'

export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenuScene'})
    }

    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.spritesheet('character', 'assets/andre.png', { frameWidth: 60, frameHeight: 100 });
    }
    
    create() {
        this.add.image(400, 300, 'background');

        this.txt = this.make.text({
            x: 400,
            y: 100,
            text: 'Pestana World',
            origin: { x: 0.5, y: 0.5 },
            style: {
                font: 'bold 40px Arial',
                fill: 'white',
                wordWrap: { width: 300 }
            }
        })

        this.txt = this.make.text({
            x: 400,
            y: 500,
            text: 'Press Space Bar to Start',
            origin: { x: 0.5, y: 0.5 },
            style: {
                font: 'bold 20px Arial',
                fill: 'white',
                wordWrap: { width: 800 }
            }
        })

        this.player = this.add.sprite(400, 300, 'character', 4);

        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard. KeyCodes.SPACE)
    }

    update() {
        if(this.spaceBar.isDown) {
            this.scene.start('Level1Scene')
        }
    }
}