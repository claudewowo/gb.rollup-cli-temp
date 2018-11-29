/**
 * your code here!
 */

class bar {
    constructor(name) {
        this.name = name;
    }
}

class Foo extends bar {
    constructor() {
        super();
    }
    getName() {
        return this.name;
    }
}

export default Foo;
