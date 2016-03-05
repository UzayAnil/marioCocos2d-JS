(function(){
    var Hero = cc.PhysicsSprite.extend({
        ctor: function(frame){
            this._super(frame);
            
            var body = new cp.Body(0.01, cp.momentForBox(0.01, this.width, this.height));
            gm.ph.space.addBody(body);

            var shape = new cp.BoxShape(body, this.width, this.height);
            shape.setElasticity(0);
            shape.setFriction(0.5);
    
            gm.ph.space.addShape(shape);
            this.setBody(body);
            
            return true;
        }
    });
    gm.Hero = Hero;
})();