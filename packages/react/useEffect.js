export function useEffect(callback, newDeps) {
    if (!window.currentStateDispatcher.effects) {
        window.currentStateDispatcher.effects = {
            counter: 0,
            values: [],
            shouldRun: false,
        };
    }

    const effectsObj = window.currentStateDispatcher.effects;
    const frozenCounter = effectsObj.counter;

    effectsObj.counter++;

    // Store or update the effect data on the node
    const effect = {
        prevDeps: effectsObj.values[frozenCounter]?.currentDeps || undefined,
        currentDeps: newDeps,
        callback,
    };

    effectsObj.values[frozenCounter] = effect;
}
