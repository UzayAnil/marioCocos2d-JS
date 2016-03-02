var World = cc.Scene.extend({
    ctor: function(){
        this._super();        
        return true;
    },
    onEnter: function(){
        cc.addChild();
    }
});