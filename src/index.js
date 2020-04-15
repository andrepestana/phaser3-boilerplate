import Phaser from 'phaser'
import MainMenuScene from './scenes/MainMenuScene'
import Level1Scene from './scenes/Level1Scene'

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: true
      }
    },
    input: {
      activePointers: 3,
    },
    scene: [ MainMenuScene, Level1Scene ]
}

new Phaser.Game(config)
