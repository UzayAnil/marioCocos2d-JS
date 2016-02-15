var Hero = cc.Sprite.extend({
    ctor:function(heroName, p){
        this._super("#"+heroName);
        this.attr({
            anchorX: 0,
            anchorY: 0,
            x: p.x,
            y: p.y
        });
        this.scheduleUpdate();
        this.heroName = heroName;
        actionManager.hero = this;
        actionManager.foward = this.foward;
        actionManager.back = this.back;
        actionManager.jump = this.jump;
        actionManager.stop = this.stop;
        
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
        if(hero.jumpping())
            return;
        var action = cc.jumpBy(hero.speed,  cc.p(0, 0), 70, 1);
        hero.jumpping = function(){
            if(action.isDone()){
                
                hero.jumpping = function(){
                    return false;
                }
            }
            return !action.isDone();
        };
        hero.runAction(action);
    },
    jumpping: function(){
        return false;
    },
    stop: function(hero){
        if(!hero.currentAction)
            return;
        hero.currentAction.stop();
        if(!hero.currentAction.isDone() || hero.jumpping())
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