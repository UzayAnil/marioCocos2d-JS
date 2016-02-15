cacheAnimationLoader
    .chacheAnimations
    .push(new CacheAnimation(
            animationsNames.heroWalk,
            function() {
                addCacheAnimation(animationsNames.heroWalk, 
                    addSpriteFrame([
                        { name: "mario", clipping: cc.rect(640 + (16*0), 384, 16, 16) },
                        { name: "heroWalk1", clipping: cc.rect(640 + (16*1), 384, 16, 16) },
                        { name: "heroWalk2", clipping: cc.rect(640 + (16*2), 384, 16, 16) },
                        { name: "heroWalk3", clipping: cc.rect(640 + (16*3), 384, 16, 16) }]), 
                    0.1, true);    
            }
));

cacheAnimationLoader
    .chacheAnimations
    .push(new CacheAnimation(
            animationsNames.heroJump,
            function() {
                addCacheAnimation(animationsNames.heroJump, 
                    addSpriteFrame([{ name: "jump", clipping: cc.rect(640 + (16*5), 384, 16, 16) }],
                   0.1, false))}
    ));

cacheAnimationLoader
    .chacheAnimations
    .push(new CacheAnimation(
        animationsNames.goombaWalk,
        function() {
                addCacheAnimation(animationsNames.goombaWalk, 
                    addSpriteFrame([{ name: "goomba1", clipping: cc.rect(0,16,16,16) },
                                { name: "goomba2", clipping: cc.rect(16,16,16,16) }]),
                    2.8 / 14, true);
        }
));