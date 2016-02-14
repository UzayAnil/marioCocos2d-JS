function Actions(){
    var self = this;
    this.queue = [];
    
    this.foward = function(){};
    this.back = function(){};
    this.jump = function(){};
    this.hero = {};
    
    this.execute = function(){
        if(this.queue.length <=0 ) {
            this.stop(this.hero);
            return;
        }
        
        if(this.queue[0] == controls.right){
            this.foward(this.hero);
        }
        else if(this.queue[0] == controls.leflt){
            this.back(this.hero);
        }
        else if(this.queue[0] == controls.up){
            this.jump(this.hero);
        }
    };
    
    this.push = function(control) {
        this.queue.push(control);
    };
    
    this.clear = function(){
        this.queue = [];
    };
    
    this.load = function(mainWindow, hero){
        this.hero = hero;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:  function(keyCode, event){
                switch(keyCode){
                    case 39:
                         self.push(controls.right);
                        break;
                    case 37:
                         self.push(controls.leflt);
                        break;
                    case 38:
                         self.push(controls.up);
                        break;
                    case 40:
                         self.push(controls.down);
                        break;                   
                }
            },
            onKeyReleased: function(keyCode, event){
                self.clear();
            }
        }, mainWindow);
    }
    
};