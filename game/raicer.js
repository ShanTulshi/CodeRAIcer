function Raicer() {
    this.position = new Box2D.Common.Math.b2Vec2(2, 2);
    this.body = RaicerBody.types[0];
    this.gun = RaicerGun.types[0];
    this.tread = RaicerTread.types[0];
    this.angle = 0;
    this.width = 50;
    this.length = 200;
    this.speed = 0;
    this.currentPowerUsage=0;
    this.circuitCompletions = 0;
    // this.radar = RaicerRadar.types[0];
};

Raicer.prototype.draw = function(context, ysize) {
    // Update physax
    this.wholeBody.SetAngle(this.angle);
    this.wholeBody.ApplyImpulse(new Box2D.Common.Math.b2Vec2(this.speed * Math.sin(this.angle), this.speed * Math.cos(this.angle)), this.wholeBody.GetWorldCenter());

    
    this.position.Set(this.wholeBody.GetPosition().x * METER_TO_PIXEL * 2, this.wholeBody.GetPosition().y * METER_TO_PIXEL * 2);
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
    fixDef.shape.SetAsBox(0.5, 1);
    
    this.wholeBody.CreateFixture(fixDef);

};