const mapAttributeNameToEventName = (attributeName)=>{
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
    useState (initialState) {
        let state = initialState;
        function setState(newState) {
            console.log("set state called with: ", newState);
        }
        return [
            state,
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
    }
};
/***** APPLICATION START *****/ const { useState } = React;
const { render } = ReactDOM;
const Namer = ()=>{
    const [name, setName] = useState("Kenny");
    return /*#__PURE__*/ React.createElement("div", {
        __source: {
            fileName: "src/index.tsx",
            lineNumber: 80,
            columnNumber: 9
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("div", {
        __source: {
            fileName: "src/index.tsx",
            lineNumber: 81,
            columnNumber: 13
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("button", {
        onClick: ()=>console.log("clicked"),
        __source: {
            fileName: "src/index.tsx",
            lineNumber: 82,
            columnNumber: 17
        },
        __self: this
    }, "Click me")), /*#__PURE__*/ React.createElement("input", {
        placeholder: "name",
        type: "text",
        value: name,
        onchange: (e)=>setName(e.target.value),
        __source: {
            fileName: "src/index.tsx",
            lineNumber: 84,
            columnNumber: 13
        },
        __self: this
    }), /*#__PURE__*/ React.createElement("h3", {
        __source: {
            fileName: "src/index.tsx",
            lineNumber: 90,
            columnNumber: 13
        },
        __self: this
    }, "Name: ", name));
};
const App = ()=>/*#__PURE__*/ React.createElement("div", {
        __source: {
            fileName: "src/index.tsx",
            lineNumber: 96,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("h1", {
        __source: {
            fileName: "src/index.tsx",
            lineNumber: 97,
            columnNumber: 9
        },
        __self: this
    }, "Hello"), /*#__PURE__*/ React.createElement(Namer, {
        __source: {
            fileName: "src/index.tsx",
            lineNumber: 98,
            columnNumber: 9
        },
        __self: this
    }));
render(/*#__PURE__*/ React.createElement(Namer, {
    __source: {
        fileName: "src/index.tsx",
        lineNumber: 102,
        columnNumber: 8
    },
    __self: this
}), document.getElementById("app"));

//# sourceMappingURL=index.a96c6e9e.js.map
