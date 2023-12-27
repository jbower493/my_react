import { reRender } from "../../ReactDOM";
import { HtmlTags } from "./types";

const React: { createElement: any; initialRender: any[] } = {
    createElement(
        tag: HtmlTags | ((props: any) => void),
        props: any,
        ...children: any
    ) {
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

const hooks: {
    counter: number;
    value: any[];
} = {
    counter: 0,
    value: [],
};

export function useState<T>(initialState: T) {
    // Take a snapshot of the current counter so that we can increment the counter before we read the current value
    const frozenCursor = hooks.counter;

    // Increment the counter to be used by the next hook
    hooks.counter++;

    // If the state doesn't exist yet, initialize it
    if (hooks.value[frozenCursor] === undefined) {
        hooks.value[frozenCursor] = initialState;
    }

    function setState(newState: T) {
        // Update the state
        hooks.value[frozenCursor] = newState;

        // Reset the counter then rerender everything
        hooks.counter = 0;
        reRender();
    }

    return [hooks.value[frozenCursor], setState];
}

export function useEffect(callback: () => void, dependencies: any[]) {
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
            (frozenDep: any, index: number) => frozenDep === dependencies[index]
        )
    ) {
        return;
    }

    // TODO: find a way to run this on unmount of the component that runs the effect
    cleanupFunc = callback();
}

// TODO: implement a reconciler so that components only rerender when they need to
export function reconcile() {}

export default React;
