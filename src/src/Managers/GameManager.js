(function(){
    var GameManager = cc.Class.extend({
        init: function(){
            gm.hero = new gm.Hero("#Frame0.png");
            gm.bkMap = new gm.BackgroundWorld(resources.bkTiles);
            var startPoint = gm.bkMap.getObjects(gm.bkMap.ObjKeys.StartPoint)[0];
            gm.hero.body.setPos(cc.p( startPoint.x,  startPoint.y));
            var scene = gm.sc.firstScene();
            cc.director.runScene(scene);
            gm.cm.init(scene.animationLayer);
            gm.cm.addListener(gm.hero);
        }
    });
    gm.gameManager = new GameManager();
})();