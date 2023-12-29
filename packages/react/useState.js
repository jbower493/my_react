// - Doesn't re-render
// - Can't support more than one state per component

export function useState(initialState) {
    if (!window.currentStateDispatcher.state) {
        window.currentStateDispatcher.state = {
            counter: 0,
            values: [],
        };
    }

    const stateObj = window.currentStateDispatcher.state;
    const frozenCounter = stateObj.counter;

    stateObj.counter++;

    // Initialize state if it isn't already
    if (stateObj.values[frozenCounter] === undefined) {
        stateObj.values[frozenCounter] = initialState;
    }

    // Setter function
    function setState(newState) {
        stateObj.values[frozenCounter] = newState;
    }

    // Return state and setter
    return [stateObj.values[frozenCounter], setState];
}
