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
    document.getElementById("root").firstChild.remove();

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

function flushToHostRerenderProper(hostConfig, hostElement, newVdom) {
    // Traverse vdom and render the nodes by calling functions provided by the host config
    function flushCallback(node) {
        const frozenAlternate = node.alternate;
        node.alternate = null;

        if (typeof node.type === "function") {
            return;
        }

        // TODO: it's not working because for some reason the node.stateNode of the section here is undefined, so it's missing the if statement. Could be todo with the fetch, similar to the other bug where it was getting a really old version of the node? But don't think it's that

        // If there is an already existing state node of the same type, and it's not a text node, reuse it
        if (
            node.stateNode &&
            node.type &&
            node.stateNode.tagName.toLowerCase() === node.type
        ) {
            hostConfig.updateNode(
                node.stateNode,
                frozenAlternate.props,
                node.props
            );

            return;
        }

        const frozenStateNode = node.stateNode;
        node.stateNode = null;

        // If there's an existing state node of a different type, or it's a text node, remove it before creating new one
        if (frozenStateNode) {
            hostConfig.removeNode(frozenStateNode);
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

    // Wait until everything has finished rendering, then go back through and call all the effects
    function effectsCallback(node) {
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
        }
    }

    traverseBinaryTree(newVdom, flushCallback);
    traverseBinaryTree(newVdom, effectsCallback);
}

function flushToHost(hostConfig, hostElement, vdom) {
    // Traverse vdom and render the nodes by calling functions provided by the host config
    function flushCallback(node) {
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

    // Wait until everything has finished rendering, then go back through and call all the effects
    function effectsCallback(node) {
        if (typeof node.type === "function") {
            // Run effects on mount
            if (node.effects) {
                node.effects?.values?.forEach((effect) => {
                    effect.callback();
                });
            }
        }
    }

    traverseBinaryTree(vdom, flushCallback);
    traverseBinaryTree(vdom, effectsCallback);
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

        // Need to properly implement "updateContainer" rather than this
        flushToHostRerenderProper(
            hostConfig,
            document.getElementById("root"),
            newVdom
        );

        window.vdom = newVdom;
    }
}
