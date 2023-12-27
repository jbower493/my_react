export function createElement(tag, props, ...children) {
    const { __source, __self, ...restProps } = props;

    const reactElement = {
        tag,
        props: {
            ...restProps,
            children,
        },
    };

    return reactElement;
}
