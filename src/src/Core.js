var gm = {};
(function () {
    var GameManager = cc.Class.extend({
        ph: {},
        sc: {},
        init: function () {
            this.ph.init();
            this.sc.init(this.ph.space);
        }
    });

    var PhysicsManager = cc.Class.extend({
        space: {},
        init: function () {
            this.space = new cp.Space();
            this.space.gravity = cp.v(0, -350);
        }
    });

    var ScenesManager = cc.Class.extend({
        init: function (space) {
            var lastWorld = new World({
                map: function () {
                    return resources.bkTiles;
                }
            }, space);
            cc.director.runScene(lastWorld);
        }
    });

    gm = new GameManager();
    gm.ph = new PhysicsManager();
    gm.sc = new ScenesManager();
})();