var nivel1 = new SceneA();
var nivel2 = new SceneB();
var config = {
  type: Phaser.AUTO,
  width: window.innerWidth * window.devicePixelRatio,
  height: window.innerHeight * window.devicePixelRatio,
  backgroundColor: '#000000',
  parent: 'contenedor',
  scene: [Cargar, nivel1, nivel2],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 0
      },
      debug: false
    }
  }
};

var game = new Phaser.Game(config);
