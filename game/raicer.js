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

Raicer.prototype.draw = function(context, ysize) {
    // Update physax
    this.wholeBody.SetAngle(this.angle);
    this.wholeBody.ApplyImpulse(new Box2D.Common.Math.b2Vec2(this.speed * Math.sin(this.angle), this.speed * Math.cos(this.angle)), this.wholeBody.GetWorldCenter());


    this.position.SetV(this.wholeBody.GetPosition());
    context.translate(this.position.x, ysize -  this.position.y);
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