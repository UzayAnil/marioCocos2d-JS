(function(){
    var ControlManager = cc.Class.extend({
        focused: null,
        focus: function(obj){
            this.focused = obj;
        },
        init: function(layer){
            var self = this;
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed:  function(keyCode, event){
                    if(!self.focused) return;
                    switch(keyCode){
                        case 39:
                            if(!self.focused.onRight) return;
                            self.focused.onRight();
                            break;
                        case 37:
                            if(!self.focused.onLeft) return;
                             self.focused.onLeft();
                            break;
                        case 38:
                            if(!self.focused.onUp) return;
                            self.focused.onUp();
                            break;
                        case 40:
                            if(!self.focused.onDown) return;
                             self.focused.onDown();
                            break;
                    }
                },
                onKeyReleased: function(keyCode, event){
                    if(!self.focused) return;
                    //TODO: Implement the logic here!
                }
            }, layer);
        }
    });
    gm.cm = new ControlManager();
})();