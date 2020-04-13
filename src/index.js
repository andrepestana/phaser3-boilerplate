import Phaser from 'phaser'
import MainMenuScene from './scenes/MainMenuScene'
import Level1Scene from './scenes/Level1Scene'

const config = {
    type: Phaser.Sacel,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: false
      }
    },
    scene: [ MainMenuScene, Level1Scene ]
}

new Phaser.Game(config)
