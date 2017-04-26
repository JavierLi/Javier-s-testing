var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

var guyWidth = 90;
var guyHeight = 90;
var guyNumFrames = 20;
var character1;
var character2;
var group;

var bullets;
var fireButton;
var bulletTime = 0;
var bullet;
//

    MyPlayer = function (game, x, y) {

        Phaser.Sprite.call(this, game, x, y, 'guy');
        
        this.anchor.setTo(0.5, 0.5);
        
        game.add.existing(this);
        
        var right = this.animations.add('right', [5,6,7,8,9], 12, true);
        var idleRight = this.animations.add('rightIdle', [9], 12, false);
    
        var left = this.animations.add('left', [0,1,2,3,4], 12, true);
        var idleLeft = this.animations.add('leftIdle', [0], 12, false);
    
        var up = this.animations.add('up', [10,11,12,13,14], 12, true);
        var idleUp = this.animations.add('upIdle', [10], 12, false);
    
        var down = this.animations.add('down', [15,16,17,18,19], 12, true);
        var idleDown = this.animations.add('downIdle', [15], 12, false);
    
        left.enableUpdate = true;
        right.enableUpdate = true;
    
        game.physics.enable(this, Phaser.Physics.ARCADE);
    
        this.body.collideWorldBounds = true;
        //sets collision box
        this.body.setSize(38,20,20,10);
        
    };  

   

    MyPlayer.prototype = Object.create(Phaser.Sprite.prototype);

    MyPlayer.prototype.constructor = MyPlayer;

    function preload() {

        game.load.spritesheet('guy', 'assets/zeldaspritesheet.png', guyWidth , guyHeight , guyNumFrames);
        game.load.image('background', 'assets/backg.png');
        game.load.image('bullet', 'knife.png');


}

function create() {
    
        game.stage.backgroundColor ='#4dc3ff';
    
        // Create background and world bound.
        game.world.setBounds(0, 0, 800, 600);
        
        character2 = new MyPlayer(game, 200, 300);
        character1 = new MyPlayer(game, 600, 300);

        bullets = game.add.physicsGroup();
        bullets.createMultiple(5, 'bullet', false);
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);

        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        cursors = game.input.keyboard.createCursorKeys();



}   

    var shoot = function() {facedown};
var prodirection = faceleft;
//var faceup = bullet.body.velocity.y = 300;
//var facedown = bullet.body.velocity.y = -300;
var faceleft = -300;
var faceright = 300;


function update() {
    
    if (fireButton.isDown)
    {
        fireBullet();
    }
    
    game.physics.arcade.collide(character1);

    if (cursors.left.isDown)
    {
        character1.body.velocity.x = -100;
        character1.play('left');
        prodirection = "faceleft";

    }
    else if (cursors.right.isDown)
    {
        character1.body.velocity.x = 100;
        character1.play('right');
        prodirection = "faceright";
        
    }
    else if (cursors.up.isDown)
    {
        character1.body.velocity.y = -100;
        character1.play('up');
        prodirection = "faceup";
  
    }
    else if (cursors.down.isDown)
    {
        character1.body.velocity.y = 100;
        character1.play('down');
        prodirection = "facedown";

    }
    else
    { 
        var nextIdle;
        
      if (character1.body.velocity.x < 0)
            nextIdle = "leftIdle";
        else if (character1.body.velocity.x > 0)
            nextIdle = "rightIdle"
        else if (character1.body.velocity.y < 0)
            nextIdle = "upIdle"
        else if(character1.body.velocity.y > 0)
            nextIdle = "downIdle"
        else 
            nextIdle = null ;
            
        if (nextIdle != null)
            character1.play(nextIdle);
            
        character1.body.velocity.set(0);
        
    }
    
    game.physics.arcade.collide(character1, character2);
    
    
    var w = game.input.keyboard.addKey(Phaser.Keyboard.W);

    var a = game.input.keyboard.addKey(Phaser.Keyboard.A);

    var s = game.input.keyboard.addKey(Phaser.Keyboard.S);

    var d = game.input.keyboard.addKey(Phaser.Keyboard.D);
    

    if (a.isDown)
    {
        character2.body.velocity.x = -100;
        character2.play('left');
    }
    else if (d.isDown)
    {
        character2.body.velocity.x = 100;
        character2.play('right');
    }
    else if (w.isDown)
    {
        character2.body.velocity.y = -100;
        character2.play('up');
    }
    else if (s.isDown)
    {
        character2.body.velocity.y = 100;
        character2.play('down');
    }
    else
    {
       if (character2.body.velocity.x < 0)
            nextIdle = "leftIdle";
        else if (character2.body.velocity.x > 0)
            nextIdle = "rightIdle"
        else if (character2.body.velocity.y < 0)
            nextIdle = "upIdle"
        else if(character2.body.velocity.y > 0)
            nextIdle = "downIdle"
        else 
            nextIdle = null ;
            
        if (nextIdle != null)
            character2.play(nextIdle);
            
        character2.body.velocity.set(0);
        
    }
    
}

function fireBullet () {

    if (game.time.time > bulletTime)
    {
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(character1.x - 40, character1.y);
//            shoot();
            bullet.body.velocity.x = -300;
            bulletTime = game.time.time + 250;
        }
    }
    
}