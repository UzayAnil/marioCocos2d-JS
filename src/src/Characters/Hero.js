(function(){
    var Movements = {
        RIGHT:"RIGHT",
        LEFT:"LEFT",
        UP:"UP",
        DOWN:"DOWN",
        STOPING:"STOPING",
        STOPPED:"STOPPED"
    };
    
    var Hero = cc.PhysicsSprite.extend({
        walking: Movements.STOPPED,
        jumping: Movements.STOPPED,
        ctor: function(frame){
            this._super(frame);
            
            var body = new cp.Body(5, cp.momentForBox(5, this.width, this.height));
            gm.ph.space.addBody(body);

            var shape = new cp.BoxShape(body, this.width, this.height);
            shape.setElasticity(0);
            shape.setFriction(0.5);
            
            gm.ph.space.addShape(shape);
            this.setBody(body);
            this.scheduleUpdate();
            
            return true;
        },
        onKeyPressed: function(evt){
            switch(evt){
                case gm.CONTROL_LEFT:
                    this.walking = Movements.LEFT;
                    break;
                case gm.CONTROL_RIGHT:
                    this.walking = Movements.RIGHT;
                    break;
                case gm.CONTROL_UP:
                    this.jumping = Movements.UP;
                    break;
                case gm.CONTROL_DOWN:
                    this.jumping = Movements.DOWN;
                    break;
            }
        },
        onKeyReleased: function(evt){
            switch(evt){
                case gm.CONTROL_LEFT:                    
                case gm.CONTROL_RIGHT:
                    this.walking = Movements.STOPING;
                   break;
                case gm.CONTROL_UP:
                case gm.CONTROL_DOWN:
                    this.jumping = Movements.STOPING;
                    break;
            } 
        },
        update: function(dt){
            this.applyMov();
        },
        applyMov: function(){
            if(this.walking === Movements.STOPPED 
              && this.jumping === Movements.STOPPED)
                return;
            
            if(this.walking === Movements.LEFT)
                this.body.applyImpulse(cp.v(-10, 0), cp.v(8, 0));
            if(this.walking === Movements.RIGHT)
                this.body.applyImpulse(cp.v(10, 0), cp.v(8, 0));
            if(this.jumping === Movements.UP)
                this.body.applyImpulse(cp.v(0, 40), cp.v(0, 0));
            if(this.jumping === Movements.DOWN)
                this.body.applyImpulse(cp.v(0, -40), cp.v(0, 0));
        }
    });
    gm.Hero = Hero;
})();