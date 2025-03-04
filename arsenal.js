class Arsenal {
    constructor() {
        this.count = 1;
    }
    value() {
        return this.count * 10;
    }
    increment() {
        this.count += 1;
    }
}

export default Arsenal;