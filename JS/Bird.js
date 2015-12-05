function Bird(y){
	
	//Textures
	this.textures = new Array();
	this.textures[0] = new Image();
	this.textures[0].src = textureFolder + 'birdOrange0.png';
	this.textures[1] = new Image();
	this.textures[1].src = textureFolder + 'birdOrange1.png';
	this.textures[2] = new Image();
	this.textures[2].src = textureFolder + 'birdOrange2.png';
	
	this.currentFrame = 0;
    this.wing = 0;
	//y = H0 + V0 * T - 1/2 * g * t^2
	this.h0 = y;
	this.v0 = -30;
	this.g = -9.8;
	this.time = 0.0;
	
	this.position = new Vector2(100, this.h0);
	
	this.vertex = new Array(4);
	
	
	//update method
	this.update = function(frameTime){
	
        if(state == GameState.GAMEPLAY){
		//animation texture
        if(this.wing == 10)
        {
            this.currentFrame = (this.currentFrame + 1) % this.textures.length;
            this.wing = 0;
        }
        else{
            this.wing++;
        }
        
				
        //animation position
        this.time += frameTime/100;
        this.position.y = this.h0 + (this.v0 * this.time - 0.5 * this.g * Math.pow(this.time,2));		
		
		var minx = this.position.x - 9;
		var maxx = this.position.x + 9;
		var miny = this.position.y - 12;
		var maxy = this.position.y + 12;
		
		this.vertex[0] = new Vector2(minx,miny);//top left
		this.vertex[1] = new Vector2(maxx,miny);//top right
		this.vertex[2] = new Vector2(minx,maxy);//bottom left
		this.vertex[3] = new Vector2(maxx,maxy);//bottom right
		
		this.checkCollision(entities[2]);
		this.checkCollision(entities[3]);
            
        }
		
	}
	
	
	//check Collision with pipelines
	this.checkCollision = function(pipeline){
		for(var i=0;i<this.vertex.length;i++)
		{
			var vx = this.vertex[i].x;
			var vy = this.vertex[i].y;
			
			if((this.position.y > context.canvas.height - 112) || (vx >= pipeline.scrollX && vx < pipeline.scrollX + 52 && (vy < pipeline.gapY - 50 || vy > pipeline.gapY + 50))){
				hitSound.currentTime = 0;
				hitSound.play();  
                window.setTimeout(function(){
                    dieSound.currentTime = 0;
				    dieSound.play();
                    },500);
                
				SetNewState(GameState.GAMEOVER);
                
			}
		}
	}
	
	//apply bird impulse
	this.applyImpulse = function(){
        if(this.position.y - 20 >= 0){
		this.v0 = -30;
		this.h0 = this.position.y;
		this.time = 0;
        }
	}
	
	//draw method
	this.draw = function(){
		context.drawImage(this.textures[this.currentFrame],this.position.x - this.textures[0].width/2, this.position.y - this.textures[0].height/2);
	}
	
	//reset method
	this.reset = function(){
		this.position.y = 200;
		this.time = 0;
	}
	
}