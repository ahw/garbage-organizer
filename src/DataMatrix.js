export default class DataMatrix {
    constructor() {
        this.data = [];
    }

    set(i, j, value) {
        if (typeof this.data[i] === 'undefined') {
            this.data[i] = [];
        }

        this.data[i][j] = value;
    }

    asArray() {
        return this.data;
    }
}
