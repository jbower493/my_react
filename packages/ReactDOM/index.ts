import React from "../React";

const mapAttributeNameToEventName = (attributeName) => {
    switch (attributeName) {
        case "onClick":
            return "click";
        case "onChange":
            return "change";
        default:
            return "";
    }
};

const app = {
    reactElement: null,
    containerElement: null,
};

export function render(element, container: HTMLElement) {
    // Store the root dom element so that we can rerender it later
    if (!app.reactElement) {
        app.reactElement = element;
        app.containerElement = container;
    }

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
    children.forEach((child) => render(child, domElement));

    container.appendChild(domElement);
}

export function reRender() {
    app.containerElement.innerHTML = "";

    render(React.createElement(...React.initialRender), app.containerElement);
}
