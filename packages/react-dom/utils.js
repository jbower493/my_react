export function mapEventName(attributeName) {
    switch (attributeName) {
        case "onClick":
            return "click";
        case "onChange":
            return "change";
        default:
            return "";
    }
}
