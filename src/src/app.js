var HelloWorldLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        
        var world = new cc.TMXTiledMap("res/tmx/1_1.tmx");        
        cc.director.setDepthTest(true);
        world.runAction(new cc.ScaleBy(0, 2, 2));
        this.addChild(world, 5, 1);
        
        
        var test = world.getObjectGroup("snails");
        
        var hero = new cc.Sprite("res/tmx/tiles.png", cc.rect(656, 352, 12, 15));
        this.addChild(hero);
        this.runAction(cc.follow(hero, cc.rect(0, 0, world.width, world.height)));
        hero.attr({
            x: 100,
            y: 100
        });
        
        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

