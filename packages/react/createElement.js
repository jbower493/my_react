export function createElement(tag, props, ...children) {
    const { __source, __self, ...restProps } = props;

    function getChild(child) {
        if (!["string", "number"].includes(typeof child)) {
            return child;
        }

        return {
            type: null,
            props: child,
        };
    }

    function mapChildren(children) {
        return Array.isArray(children)
            ? children.map(getChild)
            : getChild(children);
    }

    const reactElement = {
        type: tag,
        props: {
            ...restProps,
            children: mapChildren(props.children || children),
        },
    };

    return reactElement;
}
