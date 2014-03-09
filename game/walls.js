var SIZE_MULTIPLIER = 50;
var Wall= function(pars) {
	this.size = pars.size;
	this.color = "#FF1122"
	this.position = [pars.position[0], pars.position[1]];
	
    //initialize body
    var bdef=new Box2D.Dynamics.b2BodyDef();
    bdef.position=new Box2D.Common.Math.b2Vec2(pars.position[0], pars.position[1]);
    bdef.angle=0; 
    bdef.fixedRotation=true;
	bdef.type = Box2D.Dynamics.b2Body.b2_staticBody;
    this.body=b2world.CreateBody(bdef);
    
    //initialize shape
    var fixdef=new Box2D.Dynamics.b2FixtureDef;
    fixdef.shape=new Box2D.Collision.Shapes.b2PolygonShape();
    fixdef.shape.SetAsBox(this.size[0]/2, this.size[1]/2);
    fixdef.restitution=0.4; //positively bouncy!
    this.body.CreateFixture(fixdef);
    return this;  
};

Wall.prototype.draw = function(context) {
	context.fillStyle = this.color;
    context.fillRect((this.position[0] - this.size[0]/2)*SIZE_MULTIPLIER, (this.position[1] - this.size[1] / 2)*SIZE_MULTIPLIER, this.size[0]*SIZE_MULTIPLIER, this.size[1]*SIZE_MULTIPLIER);
};