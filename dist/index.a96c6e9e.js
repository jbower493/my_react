/***** LIB CODE *****/ const mapAttributeNameToEventName = (attributeName)=>{
    switch(attributeName){
        case "onClick":
            return "click";
        case "onchange":
            return "change";
        default:
            return "";
    }
};
const React = {
    createElement: (tag, props, ...children)=>{
        if (typeof tag === "function") return tag(props);
        // Filter out source and self from props
        const { __source, __self, ...restProps } = props;
        const element = {
            tag,
            props: {
                ...restProps,
                children
            }
        };
        return element;
    },
    state: {
        counter: 0,
        value: []
    },
    useState (initialState) {
        // Take a snapshot of the current counter so that we can increment the counter before we read the current state
        const currentCounter = React.state.counter;
        // Increment the counter to be used by the next instance of useState
        React.state.counter++;
        // If the state doesn't exist yet, initialize it
        if (React.state.value[currentCounter] === undefined) React.state.value[currentCounter] = initialState;
        function setState(newState) {
            // Update the state
            React.state.value[currentCounter] = newState;
            // Reset the counter then rerender everything
            React.state.counter = 0;
            ReactDOM.reRender();
        }
        return [
            React.state.value[currentCounter],
            setState
        ];
    }
};
const ReactDOM = {
    render: (element, container)=>{
        // Create dom element
        const domElement = document.createElement(element.tag);
        // If the element is a primitive type, add it as text
        if ([
            "string",
            "number"
        ].includes(typeof element)) return container.appendChild(document.createTextNode(element));
        const { children, ...restProps } = element.props;
        // Pass all props to dom element
        Object.keys(restProps).forEach((prop)=>{
            if (typeof restProps[prop] === "function") domElement.addEventListener(mapAttributeNameToEventName(prop), restProps[prop]);
            domElement.setAttribute(prop, restProps[prop]);
        });
        // Recursively render children
        children.forEach((child)=>ReactDOM.render(child, domElement));
        container.appendChild(domElement);
    },
    reRender () {
        const container = document.getElementById("app");
        container.innerHTML = "";
        ReactDOM.render(/*#__PURE__*/ React.createElement(App, {
            __source: {
                fileName: "src/index.tsx",
                lineNumber: 93,
                columnNumber: 25
            },
            __self: this
        }), container);
    }
};
/***** APPLICATION START *****/ const { useState } = React;
const { render } = ReactDOM;
const Counter = ()=>{
    const [count, setCount] = useState(0);
    return /*#__PURE__*/ React.createElement("div", {
        __source: {
            fileName: "src/index.tsx",
            lineNumber: 105,
            columnNumber: 9
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("button", {
        onClick: ()=>setCount(count + 1),
        __source: {
            fileName: "src/index.tsx",
            lineNumber: 106,
            columnNumber: 13
        },
        __self: this
    }, "Increment Count"), /*#__PURE__*/ React.createElement("h3", {
        __source: {
            fileName: "src/index.tsx",
            lineNumber: 107,
            columnNumber: 13
        },
        __self: this
    }, "Count: ", count));
};
const Namer = ()=>{
    const [name, setName] = useState("Kenny");
    return /*#__PURE__*/ React.createElement("div", {
        __source: {
            fileName: "src/index.tsx",
            lineNumber: 116,
            columnNumber: 9
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("input", {
        placeholder: "name",
        type: "text",
        value: name,
        onchange: (e)=>setName(e.target.value),
        __source: {
            fileName: "src/index.tsx",
            lineNumber: 117,
            columnNumber: 13
        },
        __self: this
    }), /*#__PURE__*/ React.createElement("h3", {
        __source: {
            fileName: "src/index.tsx",
            lineNumber: 123,
            columnNumber: 13
        },
        __self: this
    }, "Name: ", name));
};
const App = ()=>/*#__PURE__*/ React.createElement("div", {
        __source: {
            fileName: "src/index.tsx",
            lineNumber: 129,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("h1", {
        __source: {
            fileName: "src/index.tsx",
            lineNumber: 130,
            columnNumber: 9
        },
        __self: this
    }, "Hello"), /*#__PURE__*/ React.createElement(Namer, {
        __source: {
            fileName: "src/index.tsx",
            lineNumber: 131,
            columnNumber: 9
        },
        __self: this
    }), /*#__PURE__*/ React.createElement(Counter, {
        __source: {
            fileName: "src/index.tsx",
            lineNumber: 132,
            columnNumber: 9
        },
        __self: this
    }));
render(/*#__PURE__*/ React.createElement(App, {
    __source: {
        fileName: "src/index.tsx",
        lineNumber: 136,
        columnNumber: 8
    },
    __self: this
}), document.getElementById("app"));

//# sourceMappingURL=index.a96c6e9e.js.map
