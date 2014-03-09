function RaicerBody() {
    RaicerComponent.call(this);
    this.weight = 1; // Not sure about units yet
    this.name = "defaultBodyName";
    this.description = "defaultBodyDescription";
    this.image.src = "res/our_true_car.png";
}

// RaicerBody.prototype = new RaicerComponent();
RaicerBody.prototype = Object.create(RaicerComponent.prototype);
RaicerBody.prototype.constructor = RaicerBody;

RaicerBody.initTypes = function() {
    var out = new Array();
    var defaultBody = new RaicerBody();
    out[0] = defaultBody;
    return out;
}

RaicerBody.types = RaicerBody.initTypes();
