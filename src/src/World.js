var World;
(function () {
    var AnimationLayer = cc.Layer.extend({
        space: null,
        ctor: function () {
            this._super();
            this.space = gm.ph.space;
            this.scheduleUpdate();
            this.initPhysics();
            return true;
        },
        initPhysics: function () {
            var wallBottom = new cp.SegmentShape(
                this.space.staticBody
                , cp.v(15, 32)
                , cp.v(500, 32)
                , 0);

            this.space.addStaticShape(wallBottom);
        
            this.addChild(new cc.PhysicsDebugNode(gm.ph.space), 10);
        },
        update: function (dt) {
            this.space.step(dt);
        }
    });
    
    var WorldLayer = cc.Layer.extend({
        ctor: function (prop) {
            this._super();
            this.addChild(new cc.TMXTiledMap(prop.map()));
            return true;
        }
    });

    World = cc.Scene.extend({
        ctor: function (prop, space) {
            this._super();
            this.addChild(new WorldLayer(prop), 1);
            this.addChild(new AnimationLayer(), 2);
            return true;
        }
    });
})();