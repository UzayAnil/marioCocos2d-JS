(function(){
    var MainGameScene = cc.Scene.extend({
        ctor: function (prop) {
            this._super();
            this.addChild(new gm.WorldLayer(prop), 1);
            this.addChild(new gm.AnimationLayer(), 2);
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