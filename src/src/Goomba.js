var Goomba = cc.Sprite.extend({
    ctor: function(data){
        this._super("#goomba1");
        this.attr({
            x:data.x,
            y:data.y,
            anchorX: 0,
            anchorY: 0,
        });
        var animation = cc.animationCache.getAnimation("goomba");
        this.runAction(cc.animate(animation).repeatForever());
        this.runAction(cc.moveBy(this.speed, cc.p(this.moveFactor, 0)).reverse().repeatForever());
        return true;
    },
    speed: 0.5,
    moveFactor: 12
});