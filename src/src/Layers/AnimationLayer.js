(function(){
    var AnimationLayer = cc.Layer.extend({
        ctor: function () {
            this._super();
            this.addChild(gm.charactersSpriteSheet);
            gm.charactersSpriteSheet.addChild(gm.hero);
            return true;
        },
    });
    gm.AnimationLayer = AnimationLayer;
})();