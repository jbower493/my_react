export class Fiber {
    constructor(tag, props) {
        this.state = null;
        this.props = props;
        this.child = null;
        this.sibling = null;
        this.type = tag;
    }
}
