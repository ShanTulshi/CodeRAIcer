function RaicerTread() {
    RaicerComponent.call(this);
    this.maxSpeed = 100; // Not sure about units yet
    this.maxAcceleration = 700; // Same as above
    this.turnRate = Math.PI / 2;
    this.name = "defaultTreadName";
    this.description = "defaultTreadDescription";
    this.image.src = "res/defaulttreads.png";
}

RaicerTread.prototype = new RaicerComponent();
RaicerTread.prototype.constructor = RaicerTread;

RaicerTread.initTypes = function() {
    var out = new Array();
    var defaultTread = new RaicerTread();
    out[0] = defaultTread;
    return out;
}

RaicerTread.types = RaicerTread.initTypes();
