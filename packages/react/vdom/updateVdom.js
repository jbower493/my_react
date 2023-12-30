function vdomNaryToBinary(root, parent) {
    // If it's a text node, set its type to null and it's props to the text
    if (root.isString) {
        return {
            type: null,
            props: root.string,
            child: null,
            sibling: root.sibling || null,
            parent,
        };
    }

    // Set the current state dispatcher to be the current component being called.
    if (typeof root.type === "function") {
        window.currentStateDispatcher = root;
    }

    let rootChildren =
        typeof root.type === "function"
            ? [root.type(root.props)]
            : root.props.children;

    if (rootChildren) {
        // Hack to be able to attach siblings of text nodes to the text node
        rootChildren = rootChildren.flat().map((child) => {
            if (["string", "number"].includes(typeof child)) {
                return {
                    isString: true,
                    string: child,
                };
            }

            return child;
        });

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

export function updateVdom(vdomNode) {
    vdomNaryToBinary(vdomNode, vdomNode.parent);
}
