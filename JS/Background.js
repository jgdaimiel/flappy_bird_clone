function Background(initPosX)
{
	//Attributes
	/*
    this.textureDay = new Image();
	this.textureDay.src = textureFolder + 'dayBackground.png';
    this.textureNight = new Image();
	this.textureNight.src = textureFolder + 'nightBackground.png';
    */
    
    var currentDate = new Date();
    this.texture = new Image();
    
    if((currentDate.getHours() > 21 && currentDate.getHours() <= 23) || (currentDate.getHours() >= 0 && currentDate.getHours() < 7)){
        this.texture.src = textureFolder + 'nightBackground.png';
    }
    else{
         this.texture.src = textureFolder + 'dayBackground.png'; 
    }
	
	this.initPosX = initPosX;
	this.scrollX = this.initPosX;
	
	//Methods
	//update
	this.update = function (frameTime){
		if(state == GameState.GAMEPLAY){
			this.scrollX = (this.scrollX - 0.25);
			if(this.scrollX <= -this.texture.width)
			{
				this.scrollX = this.texture.width - 1;
			}
		}
	}
	
	//draw
	this.draw = function(){
		context.drawImage(this.texture, this.scrollX, 0);
	}
	
	//reset
	this.reset = function(){
		this.scrollX = this.initPosX;
	}
}