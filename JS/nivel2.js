class SceneB extends Phaser.Scene {

  constructor() {
    super({
      key: 'sceneB'
    });
  }

  create() {
    this.face = this.add.image(400, 300, 'fac');

    this.input.manager.enabled = true;

    this.input.once('pointerdown', function() {

      this.scene.start('sceneA');

    }, this);
  }

}
