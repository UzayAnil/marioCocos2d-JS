(function(){
    var GameManager = cc.Class.extend({
        init: function(){
            gm.hero = new gm.Hero("#Frame0.png");
            gm.bkMap = new gm.BackgroundWorld(resources.bkTiles);
            cc.director.runScene(gm.sc.firstScene());
        },        
    });
    gm.gameManager = new GameManager();
})();