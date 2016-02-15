function Actions(){
    var self = this;
    this.queue = [];
    
    this.foward = function(){};
    this.back = function(){};
    this.jump = function(){};
    this.stop = function(){};
    this.hero = {};
    
    this.execute = function(){
        if(this.queue.length <= 0){
            this.stop(this.hero);
        }
        for(var i = 0; i < this.queue.length; i++){
            var ac = this.queue[i];
            if(ac == controls.right){
                this.foward(this.hero);
            }
            else if(ac == controls.leflt){
                this.back(this.hero);
            }
            else if(ac == controls.up){
                this.jump(this.hero);
            }
        }
    };
    
    this.push = function(control) {
        for(var i = 0; i < this.queue.length; i++)
            if(this.queue[i] === control)
                return;
        this.queue.push(control);
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
                self.queue.pop();
            }
        }, mainWindow);
    }
    
};