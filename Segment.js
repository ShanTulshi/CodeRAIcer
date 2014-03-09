var Segment = Class.create();
Segment.prototype = {
	var vec;
	var width; //To optimize
	init: function(dx, dy, w)
	{
		vec = new b2Vec2(dx, dy);
		width = w;
	}
	getWidth: function()
	{
		return width;
	}
	
	getDX: function()
	{
		return vec.x;
	}
	
	getDY: function()
	{
		return vec.y;
	}
	
	getLength: function()
	{
		return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
	}
}
