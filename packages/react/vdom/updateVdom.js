import { vdomNaryToBinary } from "./createVdom.js";
import _ from "../../lodashTemp";

function vdomNaryToBinaryUpdate(root, parent, newType, newProps, newSiblings) {
    // Clone current fiber and set original as it's alternate
    const rootClone = _.cloneDeep(root);
    rootClone.alternate = root;

    // If it's a text node, return normal text node with new props (sibling should already be set)
    if (root.type === null) {
        rootClone.parent = parent;
        rootClone.props = newProps;

        if (Array.isArray(newSiblings) && newSiblings.length > 0) {
            const siblingSubtree = vdomNaryToBinaryUpdate(
                root.sibling,
                parent,
                newSiblings[0].type,
                newSiblings[0].props,
                newSiblings.slice(1)
            );
            rootClone.sibling = siblingSubtree;
        }

        return rootClone;
    }

    // If newType is different, change type of alternate to newType
    if (newType && newType !== root.type) {
        rootClone.type = newType;
        delete rootClone.state;
    }

    // Reset alternates "child", "sibling" and "parent" properties to null, as they all currently point to the respective properties of the original
    rootClone.child = null;
    rootClone.sibling = null;
    rootClone.parent = null;

    // Set alternate props to new props
    rootClone.props = newProps || rootClone.props;

    let newChildren = rootClone.props.children;

    // If it's a component fiber and it's not above the rerendered component in the tree, call it again with newProps || old props to get new children. If it's not a component, set newProps on alternate
    if (typeof rootClone.type === "function") {
        window.shouldRerender =
            root.componentId === window.rerenderedComponent.componentId ||
            root.meta.lastRenderedNode?.componentId ===
                window.rerenderedComponent.componentId ||
            window.shouldRerender;

        if (window.shouldRerender) {
            // Get most up to date state (after setState has been called)
            function getLatestState() {
                // If this is the rerendered component, get the state from the actual node that called setState (this may be an older node, for example if setState is called inside of a promise, the node that calls setState will be further back than the previous render)
                if (
                    root.componentId === window.rerenderedComponent.componentId
                ) {
                    return window.rerenderedComponent.state;
                }

                return root.meta.lastRenderedNode?.state || rootClone.state;
            }

            rootClone.state = getLatestState();

            // Reset state and effect counters
            if (rootClone.state) {
                rootClone.state.counter = 0;
            }
            if (rootClone.effects) {
                rootClone.effects.counter = 0;
            }

            // Set the current state dispatcher to be the current component being called.
            window.currentStateDispatcher = rootClone;

            // Call component to get children
            newChildren = [rootClone.type(rootClone.props)];

            // We need to hold on to the last rendered node, because that is the ref that "setState" has (frozenRefToThisNode). This allows us to rerender in future if a node further down in the tree has rerendered since.
            rootClone.meta.lastRenderedNode = rootClone;
        } else {
            newChildren = root.meta.tempCalculatedChildren;

            // * Same as above, except here we grab the previously renedered node because we didn't rerender this node this time
            rootClone.meta.lastRenderedNode =
                root.meta.lastRenderedNode || root;
        }

        rootClone.meta = {
            ...rootClone.meta,
            tempCalculatedChildren: newChildren,
        };
    }

    if (Array.isArray(newChildren) && newChildren.length > 0) {
        newChildren = newChildren.flat();

        if (rootClone.type !== root.type) {
            // If newType is different, do reverse children loop part of createVdom func.
            for (let i = newChildren.length - 1; i >= 0; i--) {
                if (i > 0) {
                    const childSubtree = vdomNaryToBinary(
                        newChildren[i],
                        rootClone
                    );
                    newChildren[i - 1].sibling = childSubtree;
                } else {
                    const childSubtree = vdomNaryToBinary(
                        newChildren[i],
                        rootClone
                    );
                    rootClone.child = childSubtree;
                }
            }
        } else {
            // Handle first child
            const childSubtree = vdomNaryToBinaryUpdate(
                root.child,
                rootClone,
                newChildren[0].type,
                newChildren[0].props,
                newChildren.slice(1)
            );
            rootClone.child = childSubtree;
        }
    }

    // Handle first sibling
    if (Array.isArray(newSiblings) && newSiblings.length > 0) {
        const siblingSubtree = vdomNaryToBinaryUpdate(
            root.sibling,
            parent,
            newSiblings[0].type,
            newSiblings[0].props,
            newSiblings.slice(1)
        );
        rootClone.sibling = siblingSubtree;
    }

    // Set alternante parent
    rootClone.parent = parent || null;

    // return alternate
    return rootClone;
}

export function updateVdom(vdomNode) {
    window.rerenderedComponent = vdomNode;

    const newVdom = vdomNaryToBinaryUpdate(window.vdom, null, null, null, null);

    window.shouldRerender = false;

    return newVdom;
}
