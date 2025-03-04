class Arsenal {
    constructor() {
        this.count = 1;
        this.damage = 10;
    }
    value() {
        return this.count * this.damage;
    }
    incrementCount() {
        this.count += 1;
    }
    incrementDamage() {
        this.damage += 10;
    }
}

export default Arsenal;