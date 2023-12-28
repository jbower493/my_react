import { createVdom } from "./vdom/createVdom";

function traverseBinaryTree(root, callback) {
    if (!root) {
        return;
    }

    callback(root);
    traverseBinaryTree(root.child, callback);
    traverseBinaryTree(root.sibling, callback);
}

export class Reconciler {
    constructor(hostConfig) {
        this.hostConfig = hostConfig;
    }

    createContainer(domElement) {}

    updateContainer(reactElement, container) {}

    render(reactElement, domElement) {
        const { hostConfig } = this;

        // Create vdom
        const vdom = createVdom(reactElement);

        // Traverse vdom and render the nodes by calling functions provided by the host config
        function traversalCallback(node) {
            const element = node.type
                ? hostConfig.createNode(node)
                : hostConfig.createTextNode(node.props);

            const nodeToAppendTo = node.parent
                ? node.parent.stateNode
                : domElement;

            if (!nodeToAppendTo) {
                throw new Error("Cannot find a node to attach to");
            }

            hostConfig.appendChildToParent(nodeToAppendTo, element);
            node.stateNode = element;
        }

        traverseBinaryTree(vdom, traversalCallback);
    }
}
