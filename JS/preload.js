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
    this.load.image('player', 'assets/PNG/Enemies/playerShip3_blue2.PNG');
    this.load.image('base', 'assets/PNG/Enemies/ufoRed.PNG');
    this.load.image('background', 'assets/Backgrounds/purple.png');
    this.load.image('bala', 'assets/PNG/Lasers/laserBlue032.png');
    this.load.image('enemigo','assets/PNG/Enemies/enemyRed32.png')
  }
}
