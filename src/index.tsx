import React, { useState, useEffect } from "../packages/React";
import { render } from "../packages/ReactDOM";

const Counter = () => {
    const [count, setCount] = useState(0);

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Increment Count</button>
            <h3>Count: {count}</h3>
        </div>
    );
};

const Namer = () => {
    const [name, setName] = useState("Kenny");

    return (
        <div>
            <input
                placeholder="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <h3>Name: {name}</h3>
        </div>
    );
};

const Effective = () => {
    const [effectiveness, setEffectiveness] = useState(0);
    const [irrelevance, setIrrelevance] = useState(0);

    useEffect(() => {
        console.log("use effect ran");

        return () => {
            console.log("cleaned up");
        };
    }, [effectiveness]);

    return (
        <div>
            <button onClick={() => setEffectiveness(effectiveness + 1)}>
                Become More Effective
            </button>
            <span>Effectiveness: {effectiveness}</span>
            <button onClick={() => setIrrelevance(irrelevance + 1)}>
                Become More Irrelevant
            </button>
            <span>Irrelevance: {irrelevance}</span>
        </div>
    );
};

const App = () => (
    <div>
        <h1>Hello</h1>
        <Namer />
        <Counter />
        <Effective />
    </div>
);

render(<App />, document.getElementById("app"));
