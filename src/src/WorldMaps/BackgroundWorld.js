(function(){
    var BackgroundWorld = cc.TMXTiledMap.extend({
        ctor: function(map){
            this._super(map);
            return true;
        },
        ObjKeys: {
            Walls: "Walls",
            Floors: "Floors",
            StartPoint: "StartPoint"
        },
        getObjects: function(key){
            return this
                .getObjectGroup(key)
                .getObjects();
        }
    });
    gm.BackgroundWorld = BackgroundWorld;
})();
