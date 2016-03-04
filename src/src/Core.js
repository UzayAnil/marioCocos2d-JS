var gm = {};
(function () {
    var GameManager = cc.Class.extend({
        ph: null,
        sc: null,
        init: function () {
            this.ph.init();
            this.sc.init(this.ph.space);
        }
    });

    var PhysicsManager = cc.Class.extend({
        space: new cp.Space(),
        debugNode: null,
        init: function () {
            this.space.gravity = cp.v(0, -350);
            this.debugNode = new cc.PhysicsDebugNode(this.space);
        }
    });

    var World = cc.Scene.extend({
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
    
    var ScenesManager = cc.Class.extend({
        init: function () {
            var lastWorld = new World({
                map: function () {
                    return resources.bkTiles;
                }
            });
            cc.director.runScene(lastWorld);
        }
    });

    gm = new GameManager();
    gm.ph = new PhysicsManager();
    gm.sc = new ScenesManager();
})();