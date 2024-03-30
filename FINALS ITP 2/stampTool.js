//A function to paste stamps into the drawing app

function stampTool(){
  this.name = "stamp";
  this.icon = "assets/stamp.png"
  
  var self = this;
  //load Images
  this.stamp = [] //Takes in stamps
  this.stamp[0] = loadImage('assets/diamond.png')
  this.stamp[1] = loadImage('assets/sun.png')
  this.stamp[2] = loadImage('assets/shells.png')
  
  this.selectedStamp = this.stamp[0] //Set Stamp selected default to diamond
  
  stampSize = 100;
  

  
  this.draw = function(){
    stampSize = int(select("#stampSizeSlider").elt.value)/100 * 100;
    this.selectedStamp = this.stamp[document.getElementById("stampSelect").value]
    if(0<mouseX && mouseX<width && 0<mouseY && mouseY<height){
      if(mouseIsPressed){
        var stampX = mouseX - stampSize/2;
        var stampY = mouseY - stampSize/2;
        image(this.selectedStamp, stampX, stampY, stampSize,stampSize);
      }
    }
  }
  
  this.unselectTool = function() {
		select(".options").html("");
	};
  
  this.populateOptions = function(){
    select(".options").html(
    "<span> Size </span> <input id='stampSizeSlider' type='range' min='5' max='200' value='100' class='slider'><br><form><select id='stampSelect'><option value=0>Diamond</option><option value=1>Sun</option><option value=2>Shells</option></select></form>")
  }
}