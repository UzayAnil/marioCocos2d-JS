(function(){
    /**
     * Add an static tilemap object to given physics space
     * @param {cc.TMXTiledMap} map     The map containing the objects
     * @param {string} objName The key of the objects to be added
     * @param {cp.Space}   space   The physics space where object will be added
     * @param {object}   prop    A javascript object with prop.elasticity and prop.friction values 
     */  
    function convertToStaticShape(mapObjects, space, prop){
            var staticsObjs = [];
            
            mapObjects
                .forEach(function(obj){
                    var p1 = obj.polylinePoints[0];
                    for(var i = 1; i <= obj.polylinePoints.length - 1; i++){
                        var p2 = obj.polylinePoints[i];
                        //Every point in polyline is using traditional coordinate system
                        //For that reason I'm inverting it using (-) sign.
                        //Also points are located releated to object position so I had
                        //To add the obj.x and obj.y coors.
                        //It's important to convert point to ints, 'cause they originally 
                        //Are strings values
                        var v1 = cp.v(parseInt(p1.x) + obj.x, (-parseInt(p1.y)) + obj.y);
                        var v2 = cp.v(parseInt(p2.x) + obj.x, (-parseInt(p2.y)) + obj.y);
                        var seg = new cp.SegmentShape(space.staticBody, v1 , v2, 0);
                        staticsObjs.push(seg);
                        p1 = p2;
                    }
                });
            var e = (prop && prop.elasticity) ? prop.elasticity : 0;
            var f = (prop && prop.friction) ? prop.friction : 0;

            staticsObjs.forEach(function(obj){
                obj.setElasticity(e);
                obj.setFriction(f);
                space.addStaticShape(obj);
            });
    }
    
    var WorldTmx = cc.TMXTiledMap.extend({
        ctor: function(map){
            this._super(map);
            return true;
        },
        ObjKeys: {
            Walls: "Walls",
            Floors: "Floors"
        },
        getObjects: function(key){
            return this
                .getObjectGroup(key)
                .getObjects();
        }
    });
    
    var WorldLayer = cc.Layer.extend({
        map: null,
        ctor: function (prop) {            
            this._super();
            this.map = new WorldTmx(prop.map());
            this.addChild(this.map);
            cc.director.setDepthTest(true);
            this.addFloorsAndWalls();
            //this.runAction(cc.follow(gm.hero, cc.rect(0, 0, this.width, this.height)));
            return true;
        },
        addFloorsAndWalls: function() {
            convertToStaticShape(this.map.getObjects(this.map.ObjKeys.Floors), gm.ph.space, {elasticity: 0, friction: 0.3});
            convertToStaticShape(this.map.getObjects(this.map.ObjKeys.Walls), gm.ph.space, {elasticity: 0, friction: 0.3})
        }
    });
    
    gm.WorldLayer = WorldLayer;
})();