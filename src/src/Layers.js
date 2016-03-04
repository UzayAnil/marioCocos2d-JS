(function () {
    var AnimationLayer = cc.Layer.extend({
        ctor: function () {
            this._super();
            return true;
        },
    });
    
    var WorldLayer = cc.Layer.extend({
        space: null,
        ctor: function (prop) {
            this._super();
            this.space = gm.ph.space;
            this.initPhysics();
            this.addChild(new cc.TMXTiledMap(prop.map()));
            cc.director.setDepthTest(true);
            
//            this.attr = {
//                anchorX: 0,
//                anchorY: 0
//            };
            return true;
        },
        initPhysics: function () {
            var wallBottom = new cp.SegmentShape(
                this.space.staticBody,
                cp.v(0, 32),
                cp.v(500, 32),
                5);
            this.space.addStaticShape(wallBottom);
            this.addChild(gm.ph.debugNode, 100);
        }
    });
    
    gm.AnimationLayer = AnimationLayer;
    gm.WorldLayer = WorldLayer;
})();