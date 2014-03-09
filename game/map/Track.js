var Track = Class.create();
Track.prototype =  {
    var tracklength;
    init: function(trackLength)
    {
	tracklength = trackLength;
    }
    init: function()
    {
	this(Math.random()*30 + 15);
    }
    var segments = new Array();
    gen: function(){
	var dx = ((Math.random() - 0.5)*50);
	var dy = ((Math.random() + 0.1)*25);
	for(var i =0; var < tracklength; i++)
	{
	    dx = Math.random() * 10 - Math.random() * 10;
	    dy = Math.random() * 10 - Math.random() * 10;
	    segments[] = new Segment(dx, dy, Math.random() * 10);
	}
    }
    
    getSegment(i){
	if(i < segments.length)
	    return segments[i];
	else return null;
    }
    
    draw: function()
    {
	var c = new canvas();
	
    }
}
