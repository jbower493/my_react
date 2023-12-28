import { Reconciler } from "../react/reconciler";

const hostConfig = {
    createNode(nodeProperties) {
        const node = document.createElement(nodeProperties.type);

        return node;
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

const myReconciler = new Reconciler(hostConfig);

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
