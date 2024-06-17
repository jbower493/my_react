import { Reconciler } from "../react/reconciler";
import { mapEventName } from "./utils";

const hostConfig = {
    createNode(reactNode) {
        const hostNode = document.createElement(reactNode.type);

        // Pass all props to dom element
        Object.entries(reactNode.props).forEach(([key, value]) => {
            if (key === "children") {
                return;
            }

            if (typeof value === "function") {
                return hostNode.addEventListener(mapEventName(key), value);
            }

            return hostNode.setAttribute(
                key === "className" ? "class" : key,
                value
            );
        });

        return hostNode;
    },

    updateNode(node, oldProps, newProps) {
        Object.entries(oldProps).forEach(([key, value]) => {
            if (key === "children") {
                return;
            }

            if (typeof value === "function") {
                return node.removeEventListener(mapEventName(key), value);
            }

            return node.removeAttribute(key);
        });

        Object.entries(newProps).forEach(([key, value]) => {
            if (key === "children") {
                return;
            }

            if (typeof value === "function") {
                return node.addEventListener(mapEventName(key), value);
            }

            return node.setAttribute(
                key === "className" ? "class" : key,
                value
            );
        });
    },

    createTextNode(text) {
        const textNode = document.createTextNode(text);

        return textNode;
    },

    appendChildToParent(parentNode, childNode) {
        parentNode.appendChild(childNode);
    },

    removeNode(node) {
        node.remove();
    },
};

export const myReconciler = new Reconciler(hostConfig);

function render(reactElement, domElement) {
    // Temp
    myReconciler.render(reactElement, domElement);

    // if (!domElement._reactRootContainer) {
    //     domElement._reactRootContainer =
    //         myReconciler.createContainer(domElement);
    // }

    // myReconciler.updateContainer(reactElement, domElement._reactRootContainer);
}

const reactDom = {
    render,
};

export default reactDom;
