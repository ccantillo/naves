var angle, jugador, base, base2, base3, base4, balas_enemigo;
var enemis = Array();

class SceneA extends Phaser.Scene {

  constructor() {
    super({
      key: 'sceneA',
      active: true
    });
  }

  create() {
    var background = this.add.image(game.config.width / 2, game.config.height / 2, 'background').setDisplaySize(game.config.width, game.config.height);;
    jugador = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, 'player');
    base = this.physics.add.sprite(game.config.width * 0.1, game.config.height * 0.1, 'base');
    base2 = this.physics.add.sprite(game.config.width * 0.9, game.config.height * 0.9, 'base');
    base3 = this.physics.add.sprite(game.config.width * 0.9, game.config.height * 0.1, 'base');
    base4 = this.physics.add.sprite(game.config.width * 0.1, game.config.height * 0.9, 'base');
    var playerBullets = this.physics.add.group({
      classType: Bullet,
      runChildUpdate: true
    });

    var enemigos = this.physics.add.group({
      classType: Enemigo,
      runChildUpdate: true
    });

    balas_enemigo = this.physics.add.group({
      classType: BulletE,
      runChildUpdate: true
    });

    jugador.setCollideWorldBounds(true);
    jugador.health = 4;
    base.setCollideWorldBounds(true);
    base.health = 10;
    base.activo = true;
    base2.setCollideWorldBounds(true);
    base2.health = 30;
    base2.activo = true;
    base.setCollideWorldBounds(true);
    base3.health = 30;
    base3.activo = true;
    base.setCollideWorldBounds(true);
    base4.health = 30;
    base4.activo = true;


    this.input.manager.enabled = true;

    this.input.on('pointerdown', function(pointer, time, lastFired) {

      // Get bullet from bullets group
      var bullet = playerBullets.get().setActive(true).setVisible(true);


      if (bullet) {
        bullet.fire(jugador.x, jugador.y, pointer);
        this.physics.add.collider(base, bullet, enemyHitCallback);
        this.physics.add.collider(base2, bullet, enemyHitCallback);
        this.physics.add.collider(base3, bullet, enemyHitCallback);
        this.physics.add.collider(base4, bullet, enemyHitCallback);
        //this.physics.add.overlap(enemigos, bullet, enemyHitCallback);
        for(var i = 0; i<enemis.length; i++){
          this.physics.add.overlap(enemis[i], bullet, enemyHitCallback);
        }
      }
    }, this);


    this.input.on('pointermove', function(pointer) {
      let mouse = pointer

      angle = Phaser.Math.Angle.Between(jugador.x, jugador.y, mouse.x, mouse.y)
      //this.fire(angle)
      jugador.rotation = angle;
    }, this);

    this.input.keyboard.on('keydown_W', function(event) {
      jugador.setAccelerationY(-500);
    });
    this.input.keyboard.on('keydown_S', function(event) {
      jugador.setAccelerationY(500);
    });
    this.input.keyboard.on('keydown_A', function(event) {
      jugador.setAccelerationX(-500);
    });
    this.input.keyboard.on('keydown_D', function(event) {
      jugador.setAccelerationX(500);
    });

    this.input.keyboard.on('keyup_W', function(event) {
      jugador.setAccelerationY(0);
    });
    this.input.keyboard.on('keyup_S', function(event) {
      jugador.setAccelerationY(0);
    });
    this.input.keyboard.on('keyup_A', function(event) {
      jugador.setAccelerationX(0);
    });
    this.input.keyboard.on('keyup_D', function(event) {
      jugador.setAccelerationX(0);
    });

    let enem = enemigos.get().setActive(true).setVisible(true);
    enemis.push(enem);
    enem.aparecer(base.x, base.y, jugador);
    this.physics.add.collider(jugador, enem, playerHitCallback);

    var timedEvent = this.time.addEvent({
      delay: 10000,
      callback: function() {
        if (base.activo) {
          let enemy = enemigos.get().setActive(true).setVisible(true);
          enemy.aparecer(base.x, base.y, jugador);
          enemis.push(enemy);
          //this.physics.add.collider(jugador, enemy, playerHitCallback);
          //this.physics.add.overlap(jugador, enemy, playerHitCallback);
        }
        if (base2.activo) {
          let enemy2 = enemigos.get().setActive(true).setVisible(true);
          enemy2.aparecer(base2.x, base2.y, jugador);
          enemis.push(enemy2);
          //this.physics.add.collider(jugador, enemy2, playerHitCallback);
          //this.physics.add.overlap(jugador, enemy2, playerHitCallback);
        }
        if (base3.activo) {
          let enemy3 = enemigos.get().setActive(true).setVisible(true);
          enemy3.aparecer(base3.x, base3.y, jugador);
          enemis.push(enemy3);
          //this.physics.add.collider(jugador, enemy3, playerHitCallback);
          //this.physics.add.overlap(jugador, enemy3, playerHitCallback);
        }
        if (base4.activo) {
          let enemy4 = enemigos.get().setActive(true).setVisible(true);
          enemy4.aparecer(base4.x, base4.y, jugador);
          enemis.push(enemy4);
          //this.physics.add.collider(jugador, enemy4, playerHitCallback);
          //this.physics.add.overlap(jugador, enemy4, playerHitCallback);
        }
      },
      callbackScope: this,
      loop: true
    });

    var timedEvent2 = this.time.addEvent({
      delay: 2000,
      callback: function() {
        enemis[Math.floor(Math.random() * enemis.length)].disparar(this);
        console.log("disparo");
      },
      callbackScope: this,
      loop: true
    });

  }

  update(time, delta) {
    //this.face.rotation = angle;
    /*let angl = Phaser.Math.Angle.Between(base.x, base.y, jugador.x, jugador.y)
    //this.fire(angle)
    base.rotation = angl;

    base.direction = Math.atan((jugador.x - base.x) / (jugador.y - base.y));


    if (jugador.y >= base.y) {
      base.xSpeed = base.speed * Math.sin(base.direction);
      base.ySpeed = base.speed * Math.cos(base.direction);
    } else {
      base.xSpeed = -base.speed * Math.sin(base.direction);
      base.ySpeed = -base.speed * Math.cos(base.direction);
      //console.log(base.xSpeed);
    }

    base.x += base.xSpeed;
    base.y += base.ySpeed;*/

  }
}

function enemyHitCallback(enemyHit, bulletHit) {
  // Reduce health of enemy
  if (bulletHit.active === true && enemyHit.active === true) {
    enemyHit.health = enemyHit.health - 1;
    console.log("Enemy hp: ", enemyHit.health);

    // Kill enemy if health <= 0
    if (enemyHit.health <= 0) {
      enemyHit.setActive(false).setVisible(false);
      enemyHit.activo = false;
    }

    // Destroy bullet
    bulletHit.setActive(false).setVisible(false);
  }
}


function playerHitCallback(playerHit, bulletHit) {
  // Reduce health of player
  if (bulletHit.active === true && playerHit.active === true) {
    playerHit.health = playerHit.health - 1;
    console.log("Player hp: ", playerHit.health);

    // Kill hp sprites and kill player if health <= 0
    if (playerHit.health == 2) {
      //hp3.destroy();
    } else if (playerHit.health == 1) {
      //hp2.destroy();
    } else {
      //hp1.destroy();
      // Game over state should execute here
    }

    // Destroy bullet
    bulletHit.setActive(false).setVisible(false);
    bulletHit.health = 0;
    for (var i = 0; i < enemis.length; i++) {
      if (enemis[i].health == 0) {
        enemis.splice(i, 1);
      }
    }
  }
}
