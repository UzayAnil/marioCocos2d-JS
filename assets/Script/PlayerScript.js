cc.Class({
    extends: cc.Component,
    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        direction:0,
        gravity:{default:new cc.Vec2(0, -0.5)},
        speedX:0,
        speedY:0,
        maxSpeedX:45,
        maxSpeedY:1,
        accelerationX:0.5,
        frictionX:0.5,
        isGrounded:false,
        map:{default:null, type:cc.TiledMap}
    },

    // use this for initialization
    onLoad: function () {
        //add keyboard input listener to call turnLeft and turnRight
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD, 
            onKeyPressed: this.onKeyPressed.bind(this),
            onKeyReleased: this.onKeyReleased.bind(this),
        }, this.node);
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        
        // if solid tile or
        // if on a platform
        // isGrounded = true
        
        this.checkGround();
        
        if (!this.isGrounded)
        {
            // add gravity
            //if (this.speedY < this.maxSpeedY) {
                this.speedY += this.gravity.y;
                // if (this.speedY >= this.maxSpeedY)
                //     this.speedY = this.maxSpeedY;
            //}
            this.node.y += this.speedY * dt;
        }
        
        // TODO: make this code shorter
        if (this.direction !== 0) {
            this.speedX += this.accelerationX * this.direction;
            if (Math.abs(this.speedX) > this.maxSpeedX)
                this.speedX = this.maxSpeedX * this.direction;
        } else if (this.direction === 0 && this.speedX !== 0) {
            if (this.speedX > 0) {
                this.speedX -= this.frictionX;
                if (this.speedX <= 0)
                    this.speedX = 0;
            } else if (this.speedX < 0) {
                this.speedX += this.frictionX;
                if (this.speedX >= 0)
                    this.speedX = 0;
            }
        }
        
        this.node.x += this.speedX * dt;
    },
    
    onKeyPressed: function (keyCode, event) {
        switch(keyCode) {
            case cc.KEY.a:
            case cc.KEY.left:
                this.direction = -1;
                break;
            case cc.KEY.d:
            case cc.KEY.right:
                this.direction = 1;
                break;
            case cc.KEY.w:
            case cc.KEY.up:
                if (!this.jumping) {
                    this.jumping = true;
                    this.speed.y = this.jumpSpeed;    
                }
                break;
        }
    },
    
    onKeyReleased: function (keyCode, event) {
        switch(keyCode) {
            case cc.KEY.a:
            case cc.KEY.left:
            case cc.KEY.d:
            case cc.KEY.right:
                this.direction = 0;
                break;
        }
    },
    
    checkGround: function() {
        this.map.getLayer(cc.p(0, 0));
        this.isGrounded = false;
    }
});
