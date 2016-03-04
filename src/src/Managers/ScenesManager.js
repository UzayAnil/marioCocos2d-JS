(function(){
    var ScenesManager = cc.Class.extend({
        init: function () {            
            var lastWorld = new gm.WorldScene({
                map: function () {
                    return resources.bkTiles;
                }
            });
            cc.director.runScene(lastWorld);
        }
    });
    gm.sc = new ScenesManager();
})();