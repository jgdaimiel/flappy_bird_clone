function Pipelines(initPosX) {
	
	//Attributes
	this.texture = new Image();
	this.texture.src = textureFolder + 'pipeline.png';
	this.initPosX = initPosX;
	this.scrollX = this.initPosX;
	this.gapY = 200;
	this.passed = false;
	
	
	//Methods
	this.update = function(frameTime){
		if(state == GameState.GAMEPLAY)
		{
			this.scrollX = (this.scrollX - 1);
			if(this.scrollX < -this.texture.width)
			{
				this.scrollX = context.canvas.width;
				this.gapY = 100 + Math.random() * 200;
				this.passed = false;
			}
			if(!this.passed && this.scrollX < 25)
			{
				this.passed = true;
				scores += 1;
				pointSound.currentTime = 0;
				pointSound.play();
			}
		}
	}
	
	this.draw = function()
	{
		//down pipeline
		context.drawImage(this.texture, this.scrollX, this.gapY + 50);
		
		//top pipeline
		var x = this.texture.width + this.scrollX;
		var y = this.gapY - 50;
		
		context.translate(x,y);
		context.rotate(Math.PI);
		context.drawImage(this.texture,0,0);
		context.rotate(-Math.PI);
		context.translate(-x,-y);
	}
	
	this.reset = function(){
		this.scrollX = this.initPosX;
	}
}