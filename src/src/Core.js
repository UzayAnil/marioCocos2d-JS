var gm = {};

(function () {
    var GameCore = cc.Class.extend({
        gameManager: null,
        ph: null,
        sc: null,
        init: function(){
            this.sc.init();
        },        
    });
    
    gm = new GameCore();
})();