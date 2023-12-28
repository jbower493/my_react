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

function vdomNaryToBinary(root, parent) {
    // If it's a text node, don't create a vdom node. props.children will handle text nodes
    if (typeof root === "string") {
        return null;
    }

    if (root.props.children) {
        for (let i = root.props.children.length - 1; i >= 0; i--) {
            if (i > 0) {
                const childSubtree = vdomNaryToBinary(
                    root.props.children[i],
                    root
                );
                root.props.children[i - 1].sibling = childSubtree;
            } else {
                const childSubtree = vdomNaryToBinary(
                    root.props.children[i],
                    root
                );
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
