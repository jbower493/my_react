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

    createContainer(hostElement) {}

    updateContainer(reactElement, container) {}

    // Temp
    render(reactElement, hostElement) {
        const { hostConfig } = this;

        // Create vdom
        window.vdom = createVdom(reactElement);

        // Traverse vdom and render the nodes by calling functions provided by the host config
        function traversalCallback(node) {
            if (typeof node.type === "function") {
                return;
            }

            const element = node.type
                ? hostConfig.createNode(node)
                : hostConfig.createTextNode(node.props);

            function getNodeToAppendTo() {
                if (!node.parent) {
                    return hostElement;
                }

                let nearestParentWithStateNode = node.parent;

                while (!nearestParentWithStateNode.stateNode) {
                    if (!nearestParentWithStateNode.parent) {
                        nearestParentWithStateNode = { stateNode: hostElement };
                    } else {
                        nearestParentWithStateNode =
                            nearestParentWithStateNode.parent;
                    }
                }

                return nearestParentWithStateNode.stateNode;
            }

            const nodeToAppendTo = getNodeToAppendTo();

            if (!nodeToAppendTo) {
                throw new Error("Cannot find a node to attach to");
            }

            hostConfig.appendChildToParent(nodeToAppendTo, element);
            node.stateNode = element;
        }

        traverseBinaryTree(window.vdom, traversalCallback);
    }
}
