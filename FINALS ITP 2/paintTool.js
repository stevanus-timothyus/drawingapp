function paintTool(){
  this.name = "paint";
  this.icon = "assets/paint.jpg"
  
  var previousColour = [255,255,255,255];
  var stack = []
  
  //Function to check if 2 colours are same
  //colour2 is set to previousColour by default as it is mainly to scan through the space to be coloured filled.
  this.checkColour = function(colour1,colour2=previousColour){
    if(colour1[0]==colour2[0] && colour1[1]==colour2[1] && colour1[2]==colour2[2] && colour1[3]==colour2[3]){
      return true;
    }
    else{
      return false;
    }
  }
  
  //Function to check if coordinate is within boundary
  this.bounds = function(x=mouseX,y=mouseY){
    if (0<x && x<width && 0<y && y<height){
      return true
    }
    else{
      return false
    }
  }

  this.draw = function(){
    if (stack.length>0) {
        curr = stack.pop(-1) //Remove top of stack to work on new coordinate
        cLeft = true; //Resets cLeft to true each round
        cRight = true; //Resets cRight to true each round
        
        //Loop to find top most tile to be coloured
        while (this.checkColour(get(curr[0],curr[1]-1)) && this.bounds(curr[0],curr[1]-1)){
          curr[1]--
        }
        //Loop to push pixels into stack
        while (this.checkColour(get(curr[0],curr[1])) && this.bounds(curr[0],curr[1])){
          point(curr[0],curr[1])// Colours each pixel
          
          //Pushes new coordinates to work on and sets cLeft to false to prevent duplicate of uninterrupted column
          if(cLeft && this.checkColour(get(curr[0]-1,curr[1]))){
            stack.push([curr[0]-1,curr[1]])
            cLeft = false;
          }
          //Sets cLeft back to true once there exist an interuption
          else if(!this.checkColour(get(curr[0]-1,curr[1]))){
            cLeft = true;
          }
          //Same as above but for right side
          if(cRight && this.checkColour(get(curr[0]+1,curr[1]))){
            stack.push([curr[0]+1,curr[1]])
            cRight = false;
          }
          else if(!this.checkColour(get(curr[0]+1,curr[1]))){
            cRight = true;
          }
          curr[1]++ //Traverse down
        }
      }
  }

  this.mouseClicked = function(){
    if(this.bounds()){
      previousColour = get(mouseX,mouseY); //Sets the colour of pixel to be filled over with
      point(mouseX,mouseY)
      var cLeft, cRight, curr
      stack = [[mouseX,mouseY]]
      strokeWeight(1);
    }
  }
}