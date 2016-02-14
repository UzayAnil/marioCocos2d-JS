var tiles = "res/tmx/tiles.png";
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

var Goomba = cc.Sprite.extend({
    ctor: function(data){
        this._super(tiles, cc.rect(0,16,16,16));
        this.attr({
            x:data.x,
            y:data.y,
            anchorX: 0,
            anchorY: 0,
        });
        this.scheduleUpdate();
        return true;
    },
    update: function(dt){
        this.runAction(cc.moveTo(this.speed, cc.p(this.x+ this.moveFactor, this.y)));
    },
    speed: 0.8,
    moveFactor: 1
});

var Hero = cc.Sprite.extend({
    ctor:function(sprite, clipping, p){
        this._super(sprite, clipping);
        this.attr({
            anchorX: 0,
            anchorY: 0,
            x: p.x,
            y: p.y
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
        var self = this;
        var world = new cc.TMXTiledMap("res/tmx/1_1.tmx");        
        cc.director.setDepthTest(true);
        this.addChild(world, 1);
        
        world
            .getObjectGroup("Items")
            .getObjects()
            .forEach(function(obj){                
                switch (obj.type){    
                    case "Goomba":
                        self.addChild( new Goomba(obj), 2);
                        break;
                    default:
                        break;
                }
                
            });
        
        var hero = new Hero(tiles, cc.rect(640, 384, 16, 16), world.getObjectGroup("Items").getObject("StaringPoint"));
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