import { createVdom } from "./vdom/createVdom";

export class Reconciler {
    constructor(hostConfig) {}

    createContainer(domElement) {}

    updateContainer(reactElement, container) {}

    // Temp
    createVirtualDom(reactElementTree) {
        return createVdom(reactElementTree);
    }
}
