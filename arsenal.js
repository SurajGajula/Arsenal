export class Arsenal {
    constructor() {
        this.arms = [new Arm()];
    }
    value() {
        return this.arms.reduce((total, arm) => total + arm.value(), 0);
    }
    incrementArm() {
        this.arms.push(new Arm());
    }
    incrementDamage() {
        this.arms.forEach(arm => arm.damage += 10);
    }
    reset() {
        this.arms = [new Arm()];
    }
}

export class Arm {
    constructor() {
        this.type = 'normal';
        this.damage = 10;
    }
    setType(type) {
        this.type = type;
    }
    value() {
        if (this.type === 'normal') {
            return this.damage;
        }
        if (this.type === 'explosive') {
            return this.damage * 2;
        }
    }
}