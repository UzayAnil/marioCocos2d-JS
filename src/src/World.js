var World = cc.Layer.extend({
    ctor:function (level, subLevel) {
        this._super();
        var self = this;
        
        var world = new cc.TMXTiledMap("res/tmx/"+level+"_"+subLevel+".tmx");        
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
        
        //TODO: Is there some way of don't passing the hero to the actionManager
        actionManager.load(this, hero);
        
        return true;
    }
});

var WorldScene = cc.Scene.extend({
    ctor: function(level, subLevel){
        this._super();
        this.level = level;
        this.subLevel = subLevel;
        cacheAnimationLoader.load("mario")
        cacheAnimationLoader.load("goomba");
        return true;
    },
    level: null,
    subLevel: null,
    onEnter:function () {
        this._super();
        var layer = new World(this.level, this.subLevel);
        this.addChild(layer);
    }
});