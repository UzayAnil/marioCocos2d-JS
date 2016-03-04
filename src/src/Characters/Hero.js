(function(){
    var Hero = cc.PhysicsSprite.extend({
        ctor: function(){
            this._super();
            return true;
        }
    });
    gm.Hero = Hero;
})();