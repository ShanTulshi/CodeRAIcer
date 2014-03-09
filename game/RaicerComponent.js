function RaicerComponent() {
    this.image = new Image();
    this.name = "default";
    this.description = "default";
    this.angle = 0;
}

RaicerComponent.prototype.draw = function(context) {
    if (this.image.complete) {
	context.rotate(this.angle);
	context.drawImage(this.image, -this.image.width / 2, -this.image.width / 2);
    }
};
