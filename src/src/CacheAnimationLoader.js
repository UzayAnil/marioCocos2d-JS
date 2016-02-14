var CacheAnimation = function(name, animation){
    this.loaded = false;
    this.name = name;
    this.load = function(){
        if(this.loaded)
            return;
        animation();
        this.loaded = true;
    };
};

var CacheAnimationLoader = function Animations(){
    this.load = function(name){
        for(var i = 0; i < this.chacheAnimations.length; i++){
            var an = this.chacheAnimations[i];
            if(an.name === name)
                an.load();
        }
    };
        
    this.chacheAnimations = [];
}