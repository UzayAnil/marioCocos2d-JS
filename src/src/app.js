var tiles = "res/tmx/tiles.png";
var controls = {
    leflt: "left",
    right: "right",
    up: "up",
    down: "down",
    A: "A",
    B: "B",
    start: "start",
    select: "select"
}

function Actions (){
    this.queue = [];
    
    this.foward = function(){};
    this.hero = {};
    
    this.execute = function(){
        if(this.queue.length <=0 ) {
            this.stop(this.hero);
            return;
        }
        
        if(this.queue[0] == controls.right){
            this.foward(this.hero);
        }
        else if(this.queue[0] == controls.leflt){
            this.back(this.hero);
        }
        else if(this.queue[0] == controls.up){
            this.jump(this.hero);
        }
    };
    
    this.push = function(control) {
        this.queue.push(control);
    };
    
    this.clear = function(){
        this.queue = [];
    };
}

var actionManager = new Actions();

var Goomba = cc.Sprite.extend({
    ctor: function(data){
        this._super("#goomba1");
        this.attr({
            x:data.x,
            y:data.y,
            anchorX: 0,
            anchorY: 0,
        });
        var animation = cc.animationCache.getAnimation("goomba");
        this.runAction(cc.animate(animation).repeatForever());
        this.runAction(cc.moveBy(this.speed, cc.p(this.moveFactor, 0)).reverse().repeatForever());
        return true;
    },
    speed: 0.5,
    moveFactor: 12
});

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
            var animation = cc.animationCache.getAnimation("moveHero");
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
        var action = cc.jumpBy(hero.speed,  cc.p(0, 0), 50, 1);
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
        if(hero.currentAction.isDone()){
            hero.stopAllActions();
            hero.currentAction = null;
            hero.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(hero.heroName));
        }
        
        
    },
    update: function(dt){
        actionManager.execute();
    },
    currentAction: null,
    speed: 0.5,
    moveFactor: 2
});


var HelloWorldLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var self = this;
        
        //Hero
        var sfc = cc.spriteFrameCache;
        sfc.addSpriteFrame(new cc.SpriteFrame(tiles, cc.rect(cc.rect(640 + (16*0), 384, 16, 16))), "mario");
        sfc.addSpriteFrame(new cc.SpriteFrame(tiles, cc.rect(cc.rect(640 + (16*1), 384, 16, 16))), "moveHero1");
        sfc.addSpriteFrame(new cc.SpriteFrame(tiles, cc.rect(cc.rect(640 + (16*2), 384, 16, 16))), "moveHero2");
        sfc.addSpriteFrame(new cc.SpriteFrame(tiles, cc.rect(cc.rect(640 + (16*3), 384, 16, 16))), "moveHero3");
        
        var spriteFrames = [sfc.getSpriteFrame("moveHero1"), 
                            sfc.getSpriteFrame("moveHero2"), 
                            sfc.getSpriteFrame("moveHero3")];
        var animation = new cc.Animation(spriteFrames);
        animation.setDelayPerUnit(0.1);
        animation.setRestoreOriginalFrame(true);
        cc.animationCache.addAnimation(animation, "moveHero");
        
        //Goomba
        sfc.addSpriteFrame(new cc.SpriteFrame(tiles, cc.rect(cc.rect(0,16,16,16))), "goomba1");
        sfc.addSpriteFrame(new cc.SpriteFrame(tiles, cc.rect(cc.rect(16,16,16,16))), "goomba2");
        
        var spriteFrames2 = [sfc.getSpriteFrame("goomba1"), 
                            sfc.getSpriteFrame("goomba2")];
        var animation2 = new cc.Animation(spriteFrames2);
        animation2.setDelayPerUnit(2.8 / 14);
        animation2.setRestoreOriginalFrame(true);
        cc.animationCache.addAnimation(animation2, "goomba");
        
        var world = new cc.TMXTiledMap("res/tmx/1_1.tmx");        
        cc.director.setDepthTest(true);
        this.addChild(world, 1);
        
        world
            .getObjectGroup("Items")
            .getObjects()
            .forEach(function(obj){                
                switch (obj.type){    
                    case "Goomba":
                        self.addChild(new Goomba(obj), 2);
                        break;
                    default:
                        break;
                }
            });
        
        var hero = new Hero("mario", world.getObjectGroup("Items").getObject("StaringPoint"));
        this.addChild(hero, 2);
        this.runAction(cc.follow(hero, cc.rect(0, 0, world.width, world.height)));
        actionManager.hero = hero;
        
        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
        
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:  function(keyCode, event){
                switch(keyCode){
                    case 39:
                         actionManager.push(controls.right);
                        break;
                    case 37:
                         actionManager.push(controls.leflt);
                        break;
                    case 38:
                         actionManager.push(controls.up);
                        break;
                    case 40:
                         actionManager.push(controls.down);
                        break;                   
                }
            },
            onKeyReleased: function(keyCode, event){
                actionManager.clear();
            }
        }, this);
    }
});