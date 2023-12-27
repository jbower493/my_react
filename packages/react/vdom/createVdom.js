import { Fiber } from "./Fiber";

const testDom = {
    data: "div",
    children: [
        {
            data: "header",
            children: [
                {
                    data: "img",
                    children: null,
                },
            ],
        },
        {
            data: "p",
            children: null,
        },
        {
            data: "aside",
            children: [
                {
                    data: "h5",
                    children: null,
                },
                {
                    data: "h6",
                    children: [
                        {
                            data: "strong",
                            children: null,
                        },
                    ],
                },
            ],
        },
    ],
};

const test1 = {
    data: "div",
    children: [
        {
            data: "h1",
            children: [
                {
                    data: "span",
                    children: [],
                },
            ],
        },
    ],
};

const test2 = {
    data: "section",
    children: [
        {
            data: "h3",
            children: [],
        },
        {
            data: "strong",
            children: [],
        },
    ],
};

const test3 = {
    data: "div",
    children: [
        {
            data: "h1",
            children: [],
        },
        {
            data: "p",
            children: [
                {
                    data: "b",
                    children: [
                        {
                            data: "i",
                            children: [
                                {
                                    data: "d",
                                    children: [],
                                },
                            ],
                        },
                        {
                            data: "a",
                            children: [],
                        },
                    ],
                },
            ],
        },
        {
            data: "span",
            children: [],
        },
        {
            data: "section",
            children: [
                {
                    data: "h3",
                    children: [],
                },
                {
                    data: "strong",
                    children: [],
                },
            ],
        },
    ],
};

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

function traverseNaryTree(root, parent, nextSiblings) {
    console.log("node: ", root.data);

    if (!root.children || root.children.length === 0) {
        return;
    }

    root.children.forEach((child, index) => {
        traverseNaryTree(child, root, root.children.slice(index + 1));
    });
}

export function createVdom(reactElementTree) {
    const vdom = naryToBinary(test3);

    console.log(vdom);
}
