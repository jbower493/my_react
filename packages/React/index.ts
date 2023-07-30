import { reRender } from "../ReactDOM";

const React: { createElement: any; initialRender: any[] } = {
    createElement(tag, props, ...children) {
        // If its the root render, capture the args for use in ReactDOM.reRender
        if (React.initialRender.length === 0) {
            React.initialRender = [tag, props, ...children];
        }

        if (typeof tag === "function") {
            return tag(props);
        }

        // Filter out source and self from props
        const { __source, __self, ...restProps } = props;

        const element = {
            tag,
            props: {
                ...restProps,
                children,
            },
        };

        return element;
    },
    initialRender: [],
};

const hooks = {
    counter: 0,
    value: [],
};

export function useState(initialState) {
    // Take a snapshot of the current counter so that we can increment the counter before we read the current value
    const frozenCursor = hooks.counter;

    // Increment the counter to be used by the next hook
    hooks.counter++;

    // If the state doesn't exist yet, initialize it
    if (hooks.value[frozenCursor] === undefined) {
        hooks.value[frozenCursor] = initialState;
    }

    function setState(newState) {
        // Update the state
        hooks.value[frozenCursor] = newState;

        // Reset the counter then rerender everything
        hooks.counter = 0;
        reRender();
    }

    return [hooks.value[frozenCursor], setState];
}

export function useEffect(callback, dependencies) {
    // Take a snapshot of the current counter so that we can increment the counter before we read the current value
    const frozenCursor = hooks.counter;
    const frozenDeps = hooks.value[frozenCursor];

    hooks.value[frozenCursor] = dependencies;
    // Increment the counter to be used by the next hook
    hooks.counter++;

    let cleanupFunc = undefined;

    // If its not the first time and the dependencies havent changed, do nothing
    if (
        frozenDeps &&
        frozenDeps.every(
            (frozenDep, index) => frozenDep === dependencies[index]
        )
    ) {
        console.log("deps havent changed");
        return;
    }

    // TODO: find a way to run this on unmount of the component that runs the effect
    cleanupFunc = callback();
}

export default React;
