import React from "../packages/react";

function Kevin() {
    const [count, setCount] = React.useState(0);
    console.log("kevin ran");
    return (
        <h2 id="headingTwo" onClick={() => setCount(count + 1)}>
            Kevin's count: {count}
        </h2>
    );
}

export default function App() {
    const [name] = React.useState("Jim");
    const [count, setCount] = React.useState(0);
    console.log("app ran");
    return (
        <div className="app">
            <h1 id="headingOne" onClick={() => setCount(count + 1)}>
                Main count: {count}
            </h1>
            <Kevin />
        </div>
    );
}
