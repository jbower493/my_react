import { Fiber } from "./Fiber";

function traverseNaryTree(root, parent, nextSiblings) {
    console.log("node: ", root.data);

    if (!root.children || root.children.length === 0) {
        return;
    }

    root.children.forEach((child, index) => {
        traverseNaryTree(child, root, root.children.slice(index + 1));
    });
}

/**
 * Algorithm to convert an n-ary tree (general tree) to a "left child right sibling" binary tree
 */
function naryToBinary(root) {
    if (root.children) {
        for (let i = root.children.length - 1; i >= 0; i--) {
            if (i > 0) {
                const childSubtree = naryToBinary(root.children[i]);
                root.children[i - 1].sibling = childSubtree;
            } else {
                const childSubtree = naryToBinary(root.children[i]);
                root.child = childSubtree;
            }
        }
    }

    delete root.children;
    return root;
}

export function vdomNaryToBinary(root, parent) {
    // If it's a text node, set its type to null and it's props to the text
    if (root.type === null) {
        return {
            type: null,
            props: root.props,
            child: null,
            sibling: root.sibling || null,
            parent,
        };
    }

    let rootChildren = root.props.children;

    if (typeof root.type === "function") {
        // Set the current state dispatcher to be the current component being called.
        window.currentStateDispatcher = root;
        // Call component to get children
        rootChildren = [root.type(root.props)];

        // Mark effect for running after render
        if (root.effects) {
            root.effects.shouldRun = true;
        }

        root.meta = {
            tempCalculatedChildren: rootChildren,
        };
    }

    if (rootChildren) {
        rootChildren = rootChildren.flat();

        for (let i = rootChildren.length - 1; i >= 0; i--) {
            if (i > 0) {
                const childSubtree = vdomNaryToBinary(rootChildren[i], root);
                rootChildren[i - 1].sibling = childSubtree;
            } else {
                const childSubtree = vdomNaryToBinary(rootChildren[i], root);
                root.child = childSubtree;
            }
        }
    }

    root.parent = parent || null;

    return root;
}

export function createVdom(reactElement) {
    const vdom = vdomNaryToBinary(reactElement);

    return vdom;
}
