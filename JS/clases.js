var Bullet = new Phaser.Class({

  Extends: Phaser.GameObjects.Image,

  initialize:

    // Bullet Constructor
    function Bullet(scene) {
      Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bala');
      this.speed = 1;
      this.born = 0;
      this.direction = 0;
      this.xSpeed = 0;
      this.ySpeed = 0;
      this.setSize(12, 12, true);
    },

  // Fires a bullet from the player to the reticle
  fire: function(shooterx, shootery, target) {
    this.setPosition(shooterx, shootery); // Initial position
    this.direction = Math.atan((target.x - this.x) / (target.y - this.y));
    //let angle = Phaser.Math.Angle.Between(shooter.x, shooter.y, target.x, target.y)

    // Calculate X and y velocity of bullet to moves it from shooter to target
    if (target.y >= this.y) {
      this.xSpeed = this.speed * Math.sin(this.direction);
      this.ySpeed = this.speed * Math.cos(this.direction);
    } else {
      this.xSpeed = -this.speed * Math.sin(this.direction);
      this.ySpeed = -this.speed * Math.cos(this.direction);
    }

    let angl = Phaser.Math.Angle.Between(this.x, this.y, target.x, target.y)
    this.rotation = angl;
    this.born = 0; // Time since new bullet spawned
  },

  // Updates the position of the bullet each cycle
  update: function(time, delta) {
    this.x += this.xSpeed * delta;
    this.y += this.ySpeed * delta;
    this.born += delta;
    /*if (this.born > 1800) {
      this.setActive(false);
      this.setVisible(false);
    }*/
  }

});

var BulletE = new Phaser.Class({

  Extends: Phaser.GameObjects.Image,

  initialize:

    // Bullet Constructor
    function Bullet(scene) {
      Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bala');
      this.speed = 0.3;
      this.born = 0;
      this.direction = 0;
      this.xSpeed = 0;
      this.ySpeed = 0;
      this.setSize(12, 12, true);
    },

  // Fires a bullet from the player to the reticle
  fire: function(shooterx, shootery, target) {
    this.setPosition(shooterx, shootery); // Initial position
    this.direction = Math.atan((target.x - this.x) / (target.y - this.y));
    //let angle = Phaser.Math.Angle.Between(shooter.x, shooter.y, target.x, target.y)

    // Calculate X and y velocity of bullet to moves it from shooter to target
    if (target.y >= this.y) {
      this.xSpeed = this.speed * Math.sin(this.direction);
      this.ySpeed = this.speed * Math.cos(this.direction);
    } else {
      this.xSpeed = -this.speed * Math.sin(this.direction);
      this.ySpeed = -this.speed * Math.cos(this.direction);
    }

    let angl = Phaser.Math.Angle.Between(this.x, this.y, target.x, target.y)
    this.rotation = angl;
    this.born = 0; // Time since new bullet spawned
  },

  // Updates the position of the bullet each cycle
  update: function(time, delta) {
    this.x += this.xSpeed * delta;
    this.y += this.ySpeed * delta;
    this.born += delta;
    /*if (this.born > 1800) {
      this.setActive(false);
      this.setVisible(false);
    }*/
  }

});

var Enemigo = new Phaser.Class({

  Extends: Phaser.GameObjects.Image,

  initialize:

    // Bullet Constructor
    function Bullet(scene) {
      Phaser.GameObjects.Image.call(this, scene, 0, 0, 'enemigo');
      this.health = 5
      this.speed = 3;
      this.born = 0;
      this.direction = 0;
      this.xSpeed = 0;
      this.ySpeed = 0;
      this.setScale(0.5, 0.5);
    },

  // Fires a bullet from the player to the reticle
  aparecer: function(shooterx, shootery, target) {
    this.setPosition(shooterx, shootery); // Initial position
    // angle bullet with shooters rotation
    this.born = 0; // Time since new bullet spawned
  },

  // Updates the position of the bullet each cycle
  update: function(time, delta) {
    let angl = Phaser.Math.Angle.Between(this.x, this.y, jugador.x, jugador.y)
    this.rotation = angl;
    this.direction = Math.atan((jugador.x - this.x) / (jugador.y - this.y));
    //let angle = Phaser.Math.Angle.Between(shooter.x, shooter.y, target.x, target.y)

    // Calculate X and y velocity of bullet to moves it from shooter to target
    if (jugador.y >= this.y) {
      this.xSpeed = this.speed * Math.sin(this.direction);
      this.ySpeed = this.speed * Math.cos(this.direction);
    } else {
      this.xSpeed = -this.speed * Math.sin(this.direction);
      this.ySpeed = -this.speed * Math.cos(this.direction);
    }
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.born += delta;
    /*if (this.born > 1800) {
      this.setActive(false);
      this.setVisible(false);
    }*/
  },

  disparar: function(escena) {
    var bal = balas_enemigo.get().setActive(true).setVisible(true);
    if (bal) {
      bal.fire(this.x, this.y, jugador);
      escena.physics.add.overlap(jugador, bal, enemyHitCallback);
    }
  }

});
