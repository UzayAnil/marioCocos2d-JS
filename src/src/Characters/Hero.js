(function(){
    var Hero = cc.PhysicsSprite.extend({
        ctor: function(frame){
            this._super(frame);
            
            var body = new cp.Body(5, cp.momentForBox(5, this.width, this.height));
            gm.ph.space.addBody(body);

            var shape = new cp.BoxShape(body, this.width, this.height);
            shape.setElasticity(0);
            shape.setFriction(0.5);
    
            gm.ph.space.addShape(shape);
            this.setBody(body);
            
            return true;
        },
        onRight: function(){
            this.body.applyImpulse(cp.v(10, 0), cp.v(8, 0));
        },
        onLeft: function(){
            this.body.applyImpulse(cp.v(-10, 0), cp.v(8, 0));
        },
        onUp: function(){
            this.body.applyImpulse(cp.v(0, 30), cp.v(8, 0));
        },
        onDown: function(){
            this.body.applyImpulse(cp.v(0, -30), cp.v(8, 0));
        },
    });
    gm.Hero = Hero;
})();