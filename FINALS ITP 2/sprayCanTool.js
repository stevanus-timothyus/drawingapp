function SprayCanTool(){
	
	this.name = "sprayCanTool";
	this.icon = "assets/sprayCan.jpg";

    var self = this;
	this.points = 13;
	this.spread = 10;
  
  this.bounds = function(x=mouseX,y=mouseY){
    if (0<x && x<width && 0<y && y<height){
      return true
    }
    else{
      return false
    }
  }
  
	this.draw = function(){
      if(this.bounds()){
        strokeWeight(int(select("#FontSize").elt.value)/10);
        this.points = int(select("#PointsCount").elt.value);
        this.spread = int(select("#SpreadSize").elt.value)
          var r = random(5,10);
          if(mouseIsPressed){
              for(var i = 0; i < this.points; i++){
                  point(random(mouseX-this.spread, mouseX + this.spread), random(mouseY-this.spread, mouseY+this.spread));
              }
          }
      }
	};
    this.unselectTool = function() {
          select(".options").html("");
      };

    this.populateOptions = function(){
      select(".options").html(
      "<input id='FontSize' type='range' min='1' max='20' value='10' class='slider'> <span> Point Size </span> <br>  <input id='SpreadSize' type='range' min='1' max='40' value='20' class='slider'> <span> Spread Size </span> <br>  <input id='PointsCount' type='range' min='1' max='30' value='15' class='slider'> <span> Points Count </span>")
  }
}