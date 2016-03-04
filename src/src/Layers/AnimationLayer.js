(function(){
    var AnimationLayer = cc.Layer.extend({
        ctor: function () {
            this._super();
            this.addChild(gm.hero);
            return true;
        },
    });
})();