
function scissorsTool(){
  this.name = "scissors";
  this.icon = "assets/scissors.png";
  
  var selectMode = 0;
  var selectedArea = {x:-1, y:-1, w:100, h:100};
  var selectedPixels;

  this.draw = function(){
    //ensure drawing only occurs when mouse is inside the canvas
    if(0<mouseX && mouseX<width && 0<mouseY && mouseY<height){
      //console.log("x:" + mouseX + ", y:" + mouseY)
      if(selectMode == 0){
        //store current frame
        loadPixels();
      }
      else if(selectMode == 1){
        if(mouseIsPressed){
            if(selectedArea.x == -1){
              selectedArea.x = mouseX;
              selectedArea.y = mouseY;
            }
            else{
              //refresh the screen
              updatePixels();

              //saves width and height
              selectedArea.w = mouseX - selectedArea.x;
              selectedArea.h = mouseY - selectedArea.y;

              //store the pixels
              selectedPixels = get(selectedArea.x,selectedArea.y,selectedArea.w,selectedArea.h);
              console.log(selectedPixels);

              //draw a rectangle over it
              fill(255,0,0,100);
              noStroke();
              rect(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);
            }
        }
        else{
          selectedArea.x = -1;
          selectedArea.y = -1;
        }    
      }
      else if(selectMode == 2){
        if(mouseIsPressed){
          image(selectedPixels,mouseX,mouseY);
          loadPixels();
        }
      }
    }
  }

  this.unselectTool = function() {
		select(".options").html("");
        stroke(0);
        noFill();
	};

  this.populateOptions = function() {
    select(".options").html("<button id='scissorsButton'>Select area</button>");
    select("#scissorsButton").mouseClicked(function(){
      var button = select("#"+this.elt.id);
      
      if(selectMode == 0){
        selectMode += 1;
        button.html("Cut");
      }
      else if(selectMode == 1){        
        selectMode += 1;
        button.html("End paste");
        
        //clear the rectangle selection
        updatePixels();
        
      }
      else if(selectMode == 2){
        selectMode = 0;
        button.html("Select area");
        selectedArea = {x:-1, y:-1, w:100, h:100};
      }
    })
  }
}