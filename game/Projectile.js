function Projectile() {
    this.body = null;
    this.position = new Box2D.Common.Math.b2Vec2();
    this.image = new Image();
    this.angle = 0;
}

Projectile.prototype.draw = function(context) {
    if (this.image.complete) {
	context.translate(this.position.x, this.position.y);
	context.rotate(this.angle);
	context.drawImage(this.image, -this.image.width/2, -this.image.width/2);
    }
};

