var HelloWorldLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        
        var world = new cc.TMXTiledMap("res/tmx/1_1.tmx");        
        cc.director.setDepthTest(true);
        this.addChild(world, 1);
                
        var hero = new cc.Sprite("res/tmx/tiles.png", cc.rect(640, 384, 32, 16));
        this.addChild(hero, 2);
        this.runAction(cc.follow(hero, cc.rect(0, 0, world.width, world.height)));
        var startPoint = world.getObjectGroup("StarPoint").getObjects()[0];
        hero.attr({
            x: startPoint.x + 8,
            y: startPoint.y + 8
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

