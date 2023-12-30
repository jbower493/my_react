import { Reconciler } from "../react/reconciler";
import { mapEventName } from "./utils";

const hostConfig = {
    createNode(reactNode) {
        const hostNode = document.createElement(reactNode.type);

        // Pass all props to dom element
        Object.keys(reactNode.props).forEach((prop) => {
            if (prop === "children") {
                return;
            }

            if (typeof reactNode.props[prop] === "function") {
                return hostNode.addEventListener(
                    mapEventName(prop),
                    reactNode.props[prop]
                );
            }

            hostNode.setAttribute(
                prop === "className" ? "class" : prop,
                reactNode.props[prop]
            );
        });

        return hostNode;
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
