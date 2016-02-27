var World = cc.Layer.extend({
    initPhysics: function(worldObjects){        
        var staticBody = pSpace.staticBody;
        
        var walls = [];
        worldObjects
            .forEach(function(obj){
                switch (obj.type){
                    case "Ground":
                        var p1 = obj.polylinePoints[0];
                        var p2 = obj.polylinePoints[1];
                        var v1 = cp.v(parseInt(p1.x) + obj.x, parseInt(p1.y) + obj.y);
                        var v2 = cp.v(parseInt(p2.x) + obj.x, parseInt(p2.y) + obj.y);
                        var seg = new cp.SegmentShape(staticBody, v1 , v2, 0);
                        walls.push(seg);
                        break;
                    default:
                        break;
                }
            });
        
        for(var i = 0; i < walls.length; i++) {
            var wall = walls[i];
            wall.setElasticity(0);
            wall.setFriction(0.5);
            pSpace.addStaticShape(wall);
        }
        
        pSpace.gravity = cp.v(0, -600);
        pSpace.iterations = 100;
    },
    ctor:function (level, subLevel) {
        this._super();
        var self = this;
        this.scheduleUpdate();
        
        var world = new cc.TMXTiledMap("res/tmx/"+level+"_"+subLevel+".tmx");        
        cc.director.setDepthTest(true);
        this.addChild(world, 1);
        this.attr = {
            anchorX: 0,
            anchorY: 0
        };
        
        var worldObjects = 
            world.getObjectGroup("Items")
            .getObjects();
        
        this.initPhysics(worldObjects);
        
        worldObjects
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
    },
    update: function(dt){
        pSpace.step(dt);
    }
});

var WorldScene = cc.Scene.extend({
    ctor: function(level, subLevel){
        this._super();
        this.level = level;
        this.subLevel = subLevel;
        cacheAnimationLoader.load(animationsNames.goombaWalk);
        cacheAnimationLoader.load(animationsNames.heroJump);
        cacheAnimationLoader.load(animationsNames.heroWalk);
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