(function(){
    var ScenesManager = cc.Class.extend({
        firstScene: function(){
            //TODO: This should return the first game scene.
            return new gm.MainGameScene();
        }
    });
    gm.sc = new ScenesManager();
})();