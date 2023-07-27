const mapAttributeNameToEventName = (attributeName) => {
    switch (attributeName) {
        case "onClick":
            return "click";
        case "onchange":
            return "change";
        default:
            return "";
    }
};

const React = {
    createElement: (tag, props, ...children) => {
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
    useState(initialState) {
        let state = initialState;

        function setState(newState) {
            console.log("set state called with: ", newState);
        }

        return [state, setState];
    },
};

const ReactDOM = {
    render: (element, container: HTMLElement) => {
        // Create dom element
        const domElement: HTMLElement = document.createElement(element.tag);

        // If the element is a primitive type, add it as text
        if (["string", "number"].includes(typeof element)) {
            return container.appendChild(document.createTextNode(element));
        }

        const { children, ...restProps } = element.props;

        // Pass all props to dom element
        Object.keys(restProps).forEach((prop) => {
            if (typeof restProps[prop] === "function") {
                domElement.addEventListener(
                    mapAttributeNameToEventName(prop),
                    restProps[prop]
                );
            }
            domElement.setAttribute(prop, restProps[prop]);
        });

        // Recursively render children
        children.forEach((child) => ReactDOM.render(child, domElement));

        container.appendChild(domElement);
    },
};

/***** APPLICATION START *****/
const { useState } = React;
const { render } = ReactDOM;

const Namer = () => {
    const [name, setName] = useState("Kenny");

    return (
        <div>
            <div>
                <button onClick={() => console.log("clicked")}>Click me</button>
            </div>
            <input
                placeholder="name"
                type="text"
                value={name}
                onchange={(e) => setName(e.target.value)}
            />
            <h3>Name: {name}</h3>
        </div>
    );
};

const App = () => (
    <div>
        <h1>Hello</h1>
        <Namer />
    </div>
);

render(<Namer />, document.getElementById("app")!);
