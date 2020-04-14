import Phaser from 'phaser'
export default class MyButton extends Phaser.GameObjects.Image
{
    constructor(scene, x, y, texture, frame = null)
    {
        super(scene, x, y, texture, frame);

        this.setInteractive();
        this.isDown = false;

        this.onPressed = null;
        this.onReleased = null;

        this.on('pointerdown', () => { this.onPressed() });
        this.on('pointerover', () => { this.onPressed() });
        this.on('pointerup', () => { this.pointerUp(); });
        this.on('pointerout', () => { this.pointerUp(); });
    }

    pointerUp()
    {
        this.isDown = false;
        if(this.onReleased != null) this.onReleased();
    }

    update()
    {
        
    }
}