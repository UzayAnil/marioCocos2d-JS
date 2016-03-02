var scenesManager = {};
(function(){
    var ScenesManager = cc.Class.extend({
        init: function(){
            lastWorld = new World(1, 1);
            cc.director.runScene(lastWorld);
        }
    });
    scenesManager = new ScenesManager();
})();