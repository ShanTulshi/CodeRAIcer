function RaicerGun() {
    RaicerComponent.call(this);
    
    this.name = "defaultGunName";
    this.description = "defaultGunDescription";
    this.image.src = "res/defaultgun.png";
}

RaicerGun.prototype = new RaicerComponent();
RaicerGun.prototype.constructor = RaicerGun;

RaicerGun.initTypes = function() {
    var out = new Array();
    var defaultGun = new RaicerGun();
    out[0] = defaultGun;
    return out;
}

RaicerGun.types = RaicerGun.initTypes();
