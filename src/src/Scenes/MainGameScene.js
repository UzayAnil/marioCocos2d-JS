(function(){
    var MainGameScene = cc.Scene.extend({
        ctor: function () {
            this._super();
            this.addChild(new gm.WorldLayer(), 1);
            this.addChild(new gm.AnimationLayer(), 2);
            //TODO: Remove this layer in production deployment!
            this.addChild(gm.ph.debugNode, 100);
            this.scheduleUpdate();
            return true;
        },
        update: function(dt){
            gm.ph.space.step(dt);
        }
    });
    gm.MainGameScene = MainGameScene;
})();