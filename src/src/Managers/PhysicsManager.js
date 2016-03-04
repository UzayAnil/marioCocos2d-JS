(function(){
    var PhysicsManager = cc.Class.extend({
        ctor: function(){
            this.space.gravity = cp.v(0, -350);
            this.debugNode = new cc.PhysicsDebugNode(this.space);
        },
        space: new cp.Space(),
        debugNode: null
    });
    gm.ph = new PhysicsManager();
})();