import React, { useState } from "../packages/React";
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
                onchange={(e) => setName(e.target.value)}
            />
            <h3>Name: {name}</h3>
        </div>
    );
};

const Empty = () => {
    return <div>I feel so empty</div>;
};

const App = () => (
    <div>
        <h1>Hello</h1>
        <Namer />
        <Counter />
        <Empty />
    </div>
);

render(<App />, document.getElementById("app"));
