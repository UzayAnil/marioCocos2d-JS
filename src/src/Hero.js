var Hero = cc.PhysicsSprite.extend({
    ctor: function(heroName, starPoint){
        this.heroName = heroName;
        this._super("#"+heroName);
        
        this.scheduleUpdate();
        actionManager.hero = this;
        actionManager.foward = this.foward;
        actionManager.back = this.back;
        actionManager.jump = this.jump;
        actionManager.stop = this.stop;
        
        var body = new cp.Body(800, cp.momentForBox(800, this.width, this.height));
        body.setPos(cc.p(starPoint.x, starPoint.y));
        pSpace.addBody(body);
        
        var shape = new cp.BoxShape(body, 16, 16);
        shape.setElasticity(0);
        shape.setFriction(0.5);
//        //shape.setCollisionType(collision_type);
        pSpace.addShape(shape);
        this.setBody(body);
        
        return true;
    },
    heroName: "",
    foward: function(hero){
        hero.move(hero, false);
    },
    back: function(hero){
        hero.move(hero, true);
    },
    move: function(hero, back){
        hero.runAction(cc.flipX(back));
        if(!hero.currentAction){
            var animation = cc.animationCache.getAnimation(animationsNames.heroWalk);
            hero.runAction(cc.animate(animation).repeatForever());
        }
        hero.currentAction = cc.moveBy(hero.speed,  cc.p(hero.moveFactor, 0));
        if(back)
            hero.currentAction = hero.currentAction.reverse();
        hero.runAction(hero.currentAction);
    },
    jump: function(hero){
        if(hero.y < 0)
            return;
        if(hero.y >= (16*16)){
            hero.jumpping = true;
            return;
        }
        if(hero.jumpping){
            hero.jumpping = hero.y <= 0;
            return;
        }
            
        //hero.body.vy = hero.body.vy + 16;
        hero.y = hero.y + 4;
    },
    //TODO: Fix typo, jumpping is jumping
    jumpping: false,
    stop: function(hero){
        if(!hero.currentAction)
            return;
        hero.currentAction.stop();
        if(!hero.currentAction.isDone() || hero.jumpping)
            return;
        hero.stopAllActions();
        hero.currentAction = null;
        hero.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(hero.heroName));
    },
    update: function(dt){
        actionManager.execute();
    },
    currentAction: null,
    speed: 0.5,
    moveFactor: 2
});