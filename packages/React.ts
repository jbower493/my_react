import { reRender } from "./ReactDOM";

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

const state = {
    counter: 0,
    value: [],
};

export function useState(initialState) {
    // Take a snapshot of the current counter so that we can increment the counter before we read the current state
    const currentCounter = state.counter;

    // Increment the counter to be used by the next instance of useState
    state.counter++;

    // If the state doesn't exist yet, initialize it
    if (state.value[currentCounter] === undefined) {
        state.value[currentCounter] = initialState;
    }

    function setState(newState) {
        // Update the state
        state.value[currentCounter] = newState;

        // Reset the counter then rerender everything
        state.counter = 0;
        reRender();
    }

    return [state.value[currentCounter], setState];
}

export default React;

// const React = {
//     createElement: (tag, props, ...children) => {
//         if (typeof tag === "function") {
//             return tag(props);
//         }

//         // Filter out source and self from props
//         const { __source, __self, ...restProps } = props;

//         const element = {
//             tag,
//             props: {
//                 ...restProps,
//                 children,
//             },
//         };

//         return element;
//     },
//     state: {
//         counter: 0,
//         value: [],
//     },
//     useState(initialState) {
//         // Take a snapshot of the current counter so that we can increment the counter before we read the current state
//         const currentCounter = React.state.counter;

//         // Increment the counter to be used by the next instance of useState
//         React.state.counter++;

//         // If the state doesn't exist yet, initialize it
//         if (React.state.value[currentCounter] === undefined) {
//             React.state.value[currentCounter] = initialState;
//         }

//         function setState(newState) {
//             // Update the state
//             React.state.value[currentCounter] = newState;

//             // Reset the counter then rerender everything
//             React.state.counter = 0;
//             ReactDOM.reRender();
//         }

//         return [React.state.value[currentCounter], setState];
//     },
// };
