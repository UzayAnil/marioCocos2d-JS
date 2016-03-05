(function(){
    var Hero = cc.PhysicsSprite.extend({
        ctor: function(){
            this._super("#Frame1.png");
            
            
            
            var body = new cp.Body(1, cp.momentForBox(1, this.width, this.height));
            body.setPos(cc.p(100, 100));
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