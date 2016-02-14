var controls = {
    leflt:"left",
    right:"right",
    up:"up",
    down:"down",
    A:"A",
    B:"B",
    start:"start",
    select: "select"
}

function Actions (){
    this.queue = [];
    
    this.foward = function(){};
    this.hero = {};
    
    this.execute = function(){
        if(this.queue.length <=0 ) return;
        
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

var Hero = cc.Sprite.extend({
    ctor:function(sprite, clipping, p){
        this._super(sprite, clipping);
        this.attr({
            x: p.x + 8,
            y: p.y + 8
        });
        this.scheduleUpdate();
        
        actionManager.hero = this;
        actionManager.foward = this.foward;
        actionManager.back = this.back;
        actionManager.jump = this.jump;
        
        return true;
    },
    foward: function(hero){
        hero.runAction(cc.moveTo(hero.speed,  cc.p(hero.x + hero.moveFactor, hero.y)));
    },
    back: function(hero){
        hero.runAction(cc.moveTo(hero.speed,  cc.p(hero.x - hero.moveFactor, hero.y)));
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
    update: function(dt){
        actionManager.execute();
    },
    speed: 0.5,
    moveFactor: 2
});


var HelloWorldLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        
        var world = new cc.TMXTiledMap("res/tmx/1_1.tmx");        
        cc.director.setDepthTest(true);
        this.addChild(world, 1);
        
        
        var hero = new Hero("res/tmx/tiles.png", cc.rect(640, 384, 16, 16), world.getObjectGroup("StarPoint").getObjects()[0]);
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