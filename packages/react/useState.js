// - Doesn't re-render
// - Can't support more than one state per component

export function useState(initialState) {
    // Initialize state if it isn't already
    if (window.currentStateDispatcher.state === undefined) {
        window.currentStateDispatcher.state = initialState;
    }

    // Setter function
    function setState(newState) {
        window.currentStateDispatcher.state = newState;
    }

    // Return state and setter
    return [window.currentStateDispatcher.state, setState];
}
