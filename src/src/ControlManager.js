(function(){
    gm.CONTROL_RIGHT = 1;
    gm.CONTROL_LEFT = 2;
    gm.CONTROL_UP = 3;
    gm.CONTROL_DOWN = 4;
    
    /**
     * Convert a keyboard code event to a gamepad code event.
     * @param   {int} keyCode The keyboard code event
     * @returns {int} The gamepad code event. 
     *                Undefined if keyCode is not valid.
     */
    function getControl(keyCode){
        var key;
        switch(keyCode){
                case 39:
                    key = gm.CONTROL_RIGHT;
                    break;
                case 37:
                    key = gm.CONTROL_LEFT;
                    break;
                case 38:
                    key = gm.CONTROL_UP;
                    break;
                case 40:
                    key = gm.CONTROL_DOWN;
                    break;
            };
        return key;
    };
    
    var ControlManager = cc.Class.extend({
        listeners: [],
        addListener: function(listener){
            this.listeners.push(listener);
        },
        dispatchOnKeyPressed: function(key){
            this.listeners.forEach(function(l){
                if(!l.onKeyPressed) 
                    return;
                l.onKeyPressed(key);
            });
        },
        dispatchOnKeyReleased: function(key){
            this.listeners.forEach(function(l){
                if(!l.onKeyReleased) 
                    return;
                l.onKeyReleased(key);
            });
        },
        init: function(layer){
            var self = this;
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed:  function(keyCode, event){
                    var key = getControl(keyCode);
                    if(!key) return;
                    self.dispatchOnKeyPressed(key);
                },
                onKeyReleased: function(keyCode, event){
                    var key = getControl(keyCode);
                    if(!key) return;
                    self.dispatchOnKeyReleased(key);
                }
            }, layer);
        }
    });
    
    gm.cm = new ControlManager();
})();