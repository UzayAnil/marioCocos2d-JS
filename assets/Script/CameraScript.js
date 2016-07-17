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
        cameraX:0,
        offsetX:100,
        level:{default:null, type:cc.Node},
        player:{default:null, type:cc.Node}
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (this.player.x > this.cameraX + this.offsetX)
            this.cameraX = this.player.x - this.offsetX;
            
        this.level.x = -this.cameraX;
        
        if (this.player.x <= this.cameraX) {
            // stop the player
            this.player.x = this.cameraX;
            cc.log("Player is touching the camera");
        }
    },
});
