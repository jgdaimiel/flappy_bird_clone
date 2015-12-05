function Ground(initPosX)
{
	//Attributes
	this.texture = new Image();
	this.texture.src = textureFolder + 'ground.png';
	
	this.initPosX = initPosX;
	this.scrollX = this.initPosX;
	
	//Methods
	//update
	this.update = function (frameTime){
		if(state == GameState.GAMEPLAY){
			this.scrollX = (this.scrollX - 1);
			if(this.scrollX <= -this.texture.width)
			{
				this.scrollX = this.texture.width;
			}
		}
	}
	
	//draw
	this.draw = function(){
		context.drawImage(this.texture, this.scrollX, 412);
	}
	
	//reset
	this.reset = function(){
		this.scrollX = this.initPosX;
	}
}