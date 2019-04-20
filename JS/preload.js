class Cargar extends Phaser.Scene {
  constructor() {
    super({
      key: "Cargar"
    });
  }
  preload() {
    this.load.on("complete", () => {
      this.scene.start("sceneA");
    })
    this.load.image('player', 'assets/playerShip1_blue.png');
    this.load.image('base', 'assets/ufoRed.png');
    this.load.image('background', 'assets/purple.png');
    this.load.image('bala', 'assets/laserBlue03.png');
    this.load.image('enemigo','assets/enemyRed32.png')
  }
}
