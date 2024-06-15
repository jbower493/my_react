import { createVdom } from "./vdom/createVdom";
import { updateVdom } from "./vdom/updateVdom";

function traverseBinaryTree(root, callback) {
    if (!root) {
        return;
    }

    callback(root);
    traverseBinaryTree(root.child, callback);
    traverseBinaryTree(root.sibling, callback);
}

function flushToHostRerender(hostConfig, hostElement, newVdom) {
    // Traverse vdom and render the nodes by calling functions provided by the host config
    function traversalCallback(node) {
        node.alternate = null;
        node.stateNode = null;

        if (typeof node.type === "function") {
            // Run effects on update
            if (node.effects) {
                node.effects?.values?.forEach((effect) => {
                    // Only run if if there is no dependency array, or if any dependency has changed from prev render
                    const shouldRunEffect =
                        !effect.currentDeps ||
                        effect.currentDeps.some(
                            (currentDep, depIndex) =>
                                currentDep !== effect.prevDeps[depIndex]
                        );

                    if (shouldRunEffect) {
                        effect.callback();
                    }
                });
                node.effects.shouldRun = false;
            }

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

    traverseBinaryTree(newVdom, traversalCallback);
}

function flushToHost(hostConfig, hostElement, vdom) {
    // Traverse vdom and render the nodes by calling functions provided by the host config
    function traversalCallback(node) {
        if (typeof node.type === "function") {
            // Run effects on mount
            if (node.effects) {
                node.effects?.values?.forEach((effect) => {
                    effect.callback();
                });
            }

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

    traverseBinaryTree(vdom, traversalCallback);
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

        flushToHost(hostConfig, hostElement, window.vdom);
    }

    // Temp
    rerender(vdomNode) {
        const { hostConfig } = this;

        const newVdom = updateVdom(vdomNode);

        document.getElementById("root").firstChild.remove();

        // Need to properly implement "updateContainer" rather than this
        flushToHostRerender(
            hostConfig,
            document.getElementById("root"),
            newVdom
        );

        window.vdom = newVdom;
    }
}
