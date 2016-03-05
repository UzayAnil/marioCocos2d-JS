var gm = {};

(function () {
    var GameCore = cc.Class.extend({
        gameManager: null,
        ph: null,
        sc: null,
        hero: null,
        charactersSpriteSheet: null,
        init: function(){
            this.loadSpritesSheets();
            gm.hero = new gm.Hero();
        },
        loadSpritesSheets: function(){
            cc.spriteFrameCache.addSpriteFrames(resources.charactersPlist);
            this.charactersSpriteSheet = new cc.SpriteBatchNode(resources.characters);
        }
    });
    
    gm = new GameCore();
})();