//Chache util methods
addSpriteFrame = function(data){
    data.forEach(function(d){
        cc.spriteFrameCache
            .addSpriteFrame(new cc.SpriteFrame(tiles, d.clipping), d.name);    
    });

    return data.map(function(d){
        return d.name;
    });
};

addCacheAnimation = function(name, spritesFramesNames, delay){   
    var spritesFrames = [];
    spritesFramesNames.forEach(function(sFName){
        spritesFrames.push(cc.spriteFrameCache.getSpriteFrame(sFName));
    });
    var animation = new cc.Animation(spritesFrames);
    animation.setDelayPerUnit(delay);
    animation.setRestoreOriginalFrame(true);
    cc.animationCache.addAnimation(animation, name); 
};