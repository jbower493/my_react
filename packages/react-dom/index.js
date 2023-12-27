import { Reconciler } from "../react/reconciler";

const hostConfig = {};

const myReconciler = new Reconciler(hostConfig);

function render(reactElement, domElement) {
    // Temp
    const vdom = myReconciler.createVirtualDom(reactElement);

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
