var gm = {};

(function () {
    var GameCore = cc.Class.extend({
        gameManager: null,
        ph: null,
        sc: null,
        hero: null,
        charactersSpriteSheet: null,
        bkMap: null,
        gameManager: null,
        BackgroundWorld: null,
        Hero: null,
        cm: null,
        init: function(){
            this.load();
            this.gameManager.init();
        },
        /**
         * Load game resources like sprite sheets and animations.
         */
        load: function(){
            this.loadSpritesSheets();
        },
        loadSpritesSheets: function(){
            cc.spriteFrameCache.addSpriteFrames(resources.charactersPlist);
            this.charactersSpriteSheet = new cc.SpriteBatchNode(resources.characters);
        }
    });
    
    gm = new GameCore();
})();