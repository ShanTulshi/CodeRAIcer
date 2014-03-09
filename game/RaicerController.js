function RaicerController(raicer) {
    var acceleration = 0;
    var deltaTheta = 0;

    this.setAngle = function(theta) {
	return this.setDeltaTheta(theta - raicer.angle);
    };
    this.setDeltaTheta = function(theta) {
	deltaTheta = Math.min(raicer.tread.turnRate, Math.abs(theta)) * Math.sign(theta);
	return deltaTheta;
    };
    this.getDeltaTheta = function() {
	return deltaTheta;
    };

    this.setAcceleration = function(accel) {
	acceleration = Math.min(raicer.tread.maxAcceleration, Math.abs(accel)) * Math.sign(accel);
	return acceleration;
    };
    this.getAcceleration = function() {
	return acceleration;
    };

    this.update = function(r, dt) {
	r.angle = r.angle + (this.getDeltaTheta() * dt);
	deltaTheta = 0;
	r.speed = this.getAcceleration() * dt;
    };
}
