var MAX_SPEED = 50;
var LEFT_SIDE = 1;
var RIGHT_SIDE = 2;
var BOTH_SIDES = 0;
var MAX_POWER_USAGE = 100; // No idea what the values are so i did arbitrary
var FORCE_FACTOR = 0.1;

function Raicer() {
    this.position = new Box2D.Common.Math.b2Vec2();
    this.body = RaicerBody.types[0];
    this.gun = RaicerGun.types[0];
    this.tread = RaicerTread.types[0];
    this.angle = 0;
    this.width = 50;
    this.length = 200;
    this.speed = 0;
    this.currentPowerUsage=0;
    // this.radar = RaicerRadar.types[0];
};

Raicer.prototype.draw = function(context) {
    this.position.SetV(this.wholeBody.GetPosition());
    this.angle = this.wholeBody.GetAngle();
    context.translate(this.position.x, this.position.y);
    context.rotate(this.angle);
    context.save();
    this.tread.draw(context);
    context.restore();
    context.save();
    this.body.draw(context);
    context.restore();
    context.save();
    this.gun.draw(context);
    context.restore();
};

Raicer.prototype.implementPhysics = function() {
    var bodyDef = new Box2D.Dynamics.b2BodyDef();
    bodyDef.position= this.position;
    bodyDef.angle = this.angle;
    bodyDef.bullet = true;
    bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
    this.wholeBody = b2world.CreateBody(bodyDef);
    
    var fixDef = new Box2D.Dynamics.b2FixtureDef();
    fixDef.density = 1.0;
    fixDef.friction = 0.3;
    fixDef.restitution = 0.4;
    fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
    fixDef.shape.SetAsBox(1, 1);
    
    this.wholeBody.CreateFixture(fixDef);

};

Raicer.prototype.acclerateLeft = function(power) {
    if(this.currentPowerUsage + power > MAX_POWER_USAGE) {
	power = MAX_POWER_USAGE - this.currentPowerUsage;
    }
    this.wholeBody.ApplyImpulse(
	new Box2D.Common.Math.b2Vec2(
	    power*FORCE_FACTOR*Math.cos(this.angle),
	    power*FORCE_FACTOR*Math.sin(this.angle)
	),
	this.wholeBody.GetWorldPoint(new Box2D.Common.Math.b2Vec2(0, 0))
    );
};